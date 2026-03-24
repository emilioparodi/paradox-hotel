import { Injectable, signal, computed, inject } from '@angular/core';
import { GameState, Language, Room } from '../models/interfaces';
import { ROOMS, ITEMS } from '../config/rooms.config';
import { AudioService } from './audio';
import translationsData from '../config/translations.json';

const translations = translationsData as Record<string, {
  ui: Record<string, string>;
  rooms: Record<string, string>;
  items: Record<string, string>;
  dialogue: Record<string, string>;
}>;

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private audio = inject(AudioService);
  private state = signal<GameState>({
    language: 'en',
    currentRoomId: 'room404',
    inventory: [],
    memoryFragments: 0,
    unlockedRooms: ['room404', 'hall', 'corridor'], // Kitchen, Suite 500, Basement, Room 202 are locked
    discoveredRooms: ['room404'],
    inspectCounter: 0,
    isStarted: false,
    isGlitched: false,
    isFlashback: false,
    isFadingOut: false,
    isFadingOutBlack: false,
    activeNpcId: null,
    activeNodeId: null,
    history: [],
    isMapOpen: false,
    twinsDialogueStep: 0,
    isPanelOpen: false,
    isFuseInserted: false,
    isBackdoorActive: false,
    hasObservedPainting: false,
    isGameOver: false,
    isMaintenanceManGone: false,
    hasGivenTea: false,
    hasBeenToldToReallocate: false,
    engineerDialogueStep: 0,
    chefDialogueStep: 0,
    isKitchenLocked: true,
    hasBinaryFragment: false,
    isWhiteRoomActive: false,
    isWhiteRoomSubMenuOpen: false,
    isFinalTranslationShown: false
  });

  // Selectors
  readonly currentRoom = computed(() => {
    const room = ROOMS[this.state().currentRoomId];
    if (room.id === 'basement' && this.state().isMaintenanceManGone) {
      return {
        ...room,
        npcs: room.npcs?.filter(n => n.id !== 'maintenance_man')
      };
    }
    return room;
  });
  readonly inventory = computed(() => this.state().inventory.map(id => ITEMS[id]).filter(item => !!item));
  readonly inventoryIds = computed(() => this.state().inventory);
  readonly memoryFragments = computed(() => this.state().memoryFragments);
  readonly language = computed(() => this.state().language);
  readonly isStarted = computed(() => this.state().isStarted);
  readonly isGlitched = computed(() => this.state().isGlitched);
  readonly isFlashback = computed(() => this.state().isFlashback);
  readonly isFadingOut = computed(() => this.state().isFadingOut);
  readonly isFadingOutBlack = computed(() => this.state().isFadingOutBlack);
  readonly history = computed(() => this.state().history);
  readonly isMapOpen = computed(() => this.state().isMapOpen);
  readonly discoveredRooms = computed(() => this.state().discoveredRooms);
  readonly isBackdoorActive = computed(() => this.state().isBackdoorActive);
  readonly isGameOver = computed(() => this.state().isGameOver);
  readonly isWhiteRoomActive = computed(() => this.state().isWhiteRoomActive);
  readonly isWhiteRoomSubMenuOpen = computed(() => this.state().isWhiteRoomSubMenuOpen);
  readonly isFinalTranslationShown = computed(() => this.state().isFinalTranslationShown);
  readonly hasBinaryFragment = computed(() => this.state().hasBinaryFragment);
  readonly activeNodeId = computed(() => this.state().activeNodeId);

  readonly whiteRoomBinaryOptions = computed(() => {
    const hasFragment = this.state().hasBinaryFragment;
    const lang = this.language();
    
    const correctLabel = lang === 'it' 
      ? '[Usa Frammento di Codice: 01101...]' 
      : lang === 'es' 
      ? '[Usar Fragmento de Código: 01101...]' 
      : '[Use Found Code Fragment: 01101...]';

    const decoys = [
      '01001011',
      '11100010',
      '10110111',
      '00011101',
      '11001100',
      '10101010'
    ];

    const options: { id: string, label: string, isCorrect: boolean }[] = [];
    
    if (hasFragment) {
      options.push({ id: 'correct', label: correctLabel, isCorrect: true });
      const shuffledDecoys = this.shuffle(decoys).slice(0, 3);
      shuffledDecoys.forEach((d, i) => options.push({ id: `decoy_${i}`, label: d, isCorrect: false }));
    } else {
      const shuffledDecoys = this.shuffle(decoys).slice(0, 4);
      shuffledDecoys.forEach((d, i) => options.push({ id: `decoy_${i}`, label: d, isCorrect: false }));
    }

    return this.shuffle(options);
  });

  readonly activeNpc = computed(() => {
    const npcId = this.state().activeNpcId;
    if (!npcId) return null;
    return this.currentRoom().npcs?.find(n => n.id === npcId) || null;
  });

  readonly activeNode = computed(() => {
    const npc = this.activeNpc();
    const nodeId = this.state().activeNodeId;
    if (!npc || !nodeId) return null;
    return npc.dialogueNodes[nodeId] || null;
  });

  readonly activeChoices = computed(() => {
    const node = this.activeNode();
    if (!node) return [];
    
    const npc = this.activeNpc();
    if (npc?.id === 'twins' && (node.id.startsWith('step') || node.id === 'start')) {
      const mainChoices = node.choices.filter(c => c.id !== 'exit');
      const exitChoice = node.choices.find(c => c.id === 'exit');
      const shuffled = this.shuffle([...mainChoices]);
      return exitChoice ? [...shuffled, exitChoice] : shuffled;
    }

    if (npc?.id === 'woman' && node.id.startsWith('woman_step')) {
      const mainChoices = node.choices.filter(c => c.id !== 'exit');
      const exitChoice = node.choices.find(c => c.id === 'exit');
      const shuffled = this.shuffle([...mainChoices]);
      return exitChoice ? [...shuffled, exitChoice] : shuffled;
    }

    if (npc?.id === 'nervous_man' && (node.id.startsWith('step') || node.id === 'start')) {
      const mainChoices = node.choices.filter(c => c.id !== 'exit');
      const exitChoice = node.choices.find(c => c.id === 'exit');
      const shuffled = this.shuffle([...mainChoices]);
      return exitChoice ? [...shuffled, exitChoice] : shuffled;
    }

    if (npc?.id === 'chef' && node.id.startsWith('chef_step')) {
      const mainChoices = node.choices.filter(c => c.id !== 'exit');
      const exitChoice = node.choices.find(c => c.id === 'exit');
      const shuffled = this.shuffle([...mainChoices]);
      return exitChoice ? [...shuffled, exitChoice] : shuffled;
    }

    if (npc?.id === 'terminal' && node.id === 'start') {
      const hasReadDiary = this.state().inventory.includes('Staff Code');
      return node.choices.map(c => {
        if (c.id === 'terminal_code_1') {
          return {
            ...c,
            label: hasReadDiary 
              ? { en: '1024', it: '1024', es: '1024' } 
              : { en: '0000', it: '0000', es: '0000' }
          };
        }
        return { ...c };
      });
    }
    
    return node.choices;
  });

  readonly hasAllIdentityItems = computed(() => {
    const inv = this.state().inventory;
    return inv.includes('Access Log') && 
           inv.includes('Old Diary') && 
           inv.includes('Engineering Badge') && 
           inv.includes('Tattered Note');
  });

  isActionVisible(actionId: string): boolean {
    const room = this.currentRoom();
    const action = room.actions.find(a => a.id === actionId);
    if (!action) return false;
    
    // Special logic for basement
    if (actionId === 'open_panel') {
      return this.state().isMaintenanceManGone && !this.state().isPanelOpen;
    }
    if (actionId === 'insert_fuse') {
      return this.state().isPanelOpen && !this.state().isFuseInserted;
    }
    if (actionId === 'enter_code') {
      return this.state().isFuseInserted && !this.state().isBackdoorActive;
    }

    // If it's not secret, it's always visible
    if (!action.isSecret) return true;
    
    // Default inventory check for other secret actions
    if (action.requiredItem && this.inventoryIds().includes(action.requiredItem)) {
      return true;
    }

    // Special logic for hall
    if (actionId === 'exit_hotel') {
      return false; // Hidden, transition now handled by dialogue
    }

    return false;
  }

  isNpcVisible(npcId: string): boolean {
    const room = this.currentRoom();
    if (room.id === 'basement') {
      if (npcId === 'terminal') return false; // Hidden, accessed via 'enter_code' action
      if (npcId === 'maintenance_man' && this.state().isMaintenanceManGone) return false;
    }
    if (room.id === 'white' && npcId === 'white_terminal') {
      return false; // Hidden, accessed via 'terminate' action
    }
    return true;
  }

  setLanguage(lang: Language) {
    this.state.update(s => ({ ...s, language: lang }));
  }

  startGame(lang: Language) {
    this.state.update(s => ({
      ...s,
      language: lang,
      isStarted: true,
      history: [this.getRoomDescription(ROOMS['room404'], lang)]
    }));
  }

  toggleMap() {
    this.state.update(s => ({ ...s, isMapOpen: !s.isMapOpen }));
  }

  handleAction(actionId: string) {
    const room = this.currentRoom();
    const action = room.actions.find(a => a.id === actionId);
    const lang = this.language();

    if (!action) return;

    // Locked Room Checks
    if (action.targetRoom) {
      if (!this.state().unlockedRooms.includes(action.targetRoom)) {
        let msg = '';
        if (action.targetRoom === 'room202') {
          msg = lang === 'it' ? 'La porta è chiusa a chiave. Serve la Chiave 202.' : lang === 'es' ? 'La puerta está cerrada. Necesitas la Llave 202.' : 'The door is locked. You need Key 202.';
        } else if (action.targetRoom === 'kitchen') {
          msg = lang === 'it' ? 'La porta della cucina è chiusa a chiave.' : lang === 'es' ? 'La puerta de la cocina está cerrada.' : 'The kitchen door is locked.';
        } else if (action.targetRoom === 'suite500') {
          msg = lang === 'it' ? 'La Cameriera ti impedisce di entrare nella Suite 500.' : lang === 'es' ? 'La Camarera te impide entrar en la Suite 500.' : 'The Maid is preventing you from entering Suite 500.';
        } else if (action.targetRoom === 'basement') {
          msg = lang === 'it' ? 'Il Barista ti impedisce di scendere nel seminterrato.' : lang === 'es' ? 'El Barman te impide bajar al sótano.' : 'The Barman is preventing you from going to the basement.';
        }

        if (msg) {
          this.addHistory(msg);
          return;
        }
      }
    }

    // Specific Action Logic
    if (actionId === 'inspect_bed' && room.id === 'room404') {
      this.addItem('Tattered Note', lang === 'it' ? 'Sotto il cuscino trovi un biglietto: "Svegliati, Samuel."' : lang === 'es' ? 'Debajo de la almohada encuentras una nota: "Despierta, Samuel."' : 'Under the pillow, you find a note: "Wake up, Samuel."');
    } else if (actionId === 'inspect_painting' && room.id === 'hall') {
      const msg = lang === 'it' 
        ? 'Una tela glitchata e corrotta. Una stringa di codice binario è parzialmente visibile, ma la seconda metà di ogni byte è oscurata da una profonda macchia rossa. Si legge: 0100.... 0101.... 0100.... 0101..... Un\'etichetta sotto dice: \'Completa la sequenza per terminare la sessione\'.'
        : lang === 'es'
        ? 'Un lienzo con fallos y corrupto. Una cadena de código binario es parcialmente visible, pero la segunda mitad de cada byte está oscurecida por una mancha roja profunda. Dice: 0100.... 0101.... 0100.... 0101..... Una etiqueta debajo dice: \'Completa la secuencia para terminar la sesión\'.'
        : 'A glitchy, corrupted canvas. A string of binary code is partially visible, but the second half of each byte is obscured by a deep red stain. It reads: 0100.... 0101.... 0100.... 0101..... A label below says: \'Complete the sequence to terminate the session\'.';
      this.addHistory(msg);
      this.state.update(s => ({ ...s, hasObservedPainting: true, hasBinaryFragment: true }));
    } else if (actionId === 'inspect_desk' && room.id === 'suite500') {
      this.addItem('Old Diary', lang === 'it' ? 'Trovi un Vecchio Diario. All\'interno c\'è scritto un codice: 1024.' : lang === 'es' ? 'Encuentras un Diario Viejo. Dentro hay un código escrito: 1024.' : 'You find an Old Diary. Inside, a code is written: 1024.');
      this.addItem('Staff Code', lang === 'it' ? 'Hai imparato il Codice Personale.' : lang === 'es' ? 'Has aprendido el Código de Personal.' : 'You learned the Staff Code.');
    } else if (actionId === 'open_panel' && room.id === 'basement') {
      if (this.state().inventory.includes('Rusty Screwdriver')) {
        this.addHistory(lang === 'it' ? 'Pannello aperto.' : lang === 'es' ? 'Panel abierto.' : 'Panel opened.');
        this.state.update(s => ({ ...s, isPanelOpen: true }));
      } else {
        this.addHistory(lang === 'it' ? 'Mi serve un attrezzo per forzarlo.' : lang === 'es' ? 'Necesito una herramienta para forzarlo.' : 'I need a tool to pry this open.');
      }
    } else if (actionId === 'insert_fuse' && room.id === 'basement') {
      if (this.state().inventory.includes('Electric Fuse')) {
        this.state.update(s => ({ ...s, isFuseInserted: true }));
        this.removeItem('Electric Fuse');
        
        const msg = translations[lang].dialogue['backdoor_protocol'];
        this.addHistory(msg);
        this.addHistory(lang === 'it' ? 'Il terminale si illumina. Chiede un codice di accesso a 4 cifre.' : lang === 'es' ? 'La terminal se ilumina. Pide un código de acceso de 4 dígitos.' : 'The terminal lights up. It\'s asking for a 4-digit access code.');
      } else {
        this.addHistory(lang === 'it' ? 'Il circuito è interrotto. Mi serve un fusibile per ripristinare la corrente al terminale.' : lang === 'es' ? 'El circuito está roto. Necesito un fusible para restaurar la energía a la terminal.' : 'The circuit is broken. I need a fuse to restore power to the terminal.');
      }
    } else if (actionId === 'enter_code' && room.id === 'basement') {
      if (this.state().isFuseInserted) {
        this.startDialogue('terminal');
      } else {
        this.addHistory(lang === 'it' ? 'Il terminale è spento. Serve energia dal pannello interno.' : lang === 'es' ? 'La terminal está muerta. Necesita energía del panel interno.' : 'The terminal is dead. It needs power from the internal panel.');
      }
    } else if (action.targetRoom) {
      if (actionId === 'reset') {
        this.resetGame();
        return;
      }

      // Transition Logic
      this.state.update(s => ({
        ...s,
        currentRoomId: action.targetRoom!,
        discoveredRooms: s.discoveredRooms.includes(action.targetRoom!) ? s.discoveredRooms : [...s.discoveredRooms, action.targetRoom!],
        history: [...s.history, `--- ${ROOMS[action.targetRoom!].title[lang]} ---`, this.getRoomDescription(ROOMS[action.targetRoom!], lang)]
      }));
    }
  }

  startDialogue(npcId: string) {
    const room = this.currentRoom();
    const npc = room.npcs?.find(n => n.id === npcId);
    if (!npc) return;

    let nodeId = npc.initialNodeId;
    if (npcId === 'concierge' && this.state().isBackdoorActive) {
      nodeId = 'climax';
    }

    if (npcId === 'twins') {
      if (this.state().inventory.includes('Electric Fuse')) {
        nodeId = 'completed';
      } else if (this.state().twinsDialogueStep > 0) {
        const step = this.state().twinsDialogueStep;
        if (step < 5) {
          nodeId = step === 0 ? 'start' : `step${step + 1}`;
        } else {
          nodeId = 'reward';
        }
      }
    }

    if (npcId === 'woman') {
      if (this.state().inventory.includes('Room 202 Key')) {
        nodeId = 'completed';
      } else if (this.state().hasGivenTea) {
        nodeId = 'woman_step1';
      }
    }

    if (npcId === 'nervous_man') {
      if (this.state().inventory.includes('Engineering Badge')) {
        nodeId = 'completed';
      } else if (this.state().engineerDialogueStep > 0) {
        const step = this.state().engineerDialogueStep;
        if (step < 5) {
          nodeId = step === 0 ? 'start' : `step${step + 1}`;
        } else {
          nodeId = 'step5';
        }
      }
    }

    this.state.update(s => ({
      ...s,
      activeNpcId: npcId,
      activeNodeId: nodeId
    }));
  }

  handleDialogueChoice(choiceId: string) {
    const npc = this.activeNpc();
    const node = this.activeNode();
    if (!npc || !node) return;

    const choice = node.choices.find(c => c.id === choiceId);
    if (!choice) return;

    const lang = this.language();

    // Check Requirements
    if (choice.requiredItem && !this.state().inventory.includes(choice.requiredItem)) {
      const itemName = ITEMS[choice.requiredItem]?.name[lang] || choice.requiredItem;
      this.addHistory(lang === 'it' ? `Ti serve: ${itemName}` : lang === 'es' ? `Necesitas: ${itemName}` : `You need: ${itemName}`);
      return;
    }

    // Apply Effects
    if (choice.givesItem) {
      const itemName = ITEMS[choice.givesItem]?.name[lang] || choice.givesItem;
      this.addItem(choice.givesItem, lang === 'it' ? `Hai ottenuto: ${itemName}` : lang === 'es' ? `Has ottenuto: ${itemName}` : `You obtained: ${itemName}`);
    }

    if (choice.unlocksRoom) {
      this.state.update(s => ({ 
        ...s, 
        unlockedRooms: [...s.unlockedRooms, choice.unlocksRoom!],
        isKitchenLocked: choice.unlocksRoom === 'kitchen' ? false : s.isKitchenLocked
      }));
    }

    if (choice.endsDialogue) {
      if (npc.id === 'maintenance_man' && choiceId === 'man_step3_correct') {
        this.onMaintenanceLogicCrash();
      }
      if (npc.id === 'concierge' && choiceId === 'exit_hotel_final') {
        this.enterWhiteRoom();
      }
      this.state.update(s => ({ ...s, activeNpcId: null, activeNodeId: null }));
    }

    if (choice.nextNodeId) {
      if (npc.id === 'twins') {
        if (choiceId.includes('correct')) {
          this.state.update(s => ({ ...s, twinsDialogueStep: s.twinsDialogueStep + 1 }));
        } else if (choiceId.includes('wrong')) {
          this.state.update(s => ({ ...s, twinsDialogueStep: 0, isGlitched: true }));
          setTimeout(() => this.state.update(s => ({ ...s, isGlitched: false })), 500);
        }
      }

      if (npc.id === 'woman') {
        if (choiceId === 'give_tea') {
          this.state.update(s => ({ ...s, hasGivenTea: true }));
          this.removeItem('Elegant Tea');
        } else if (choiceId === 'take_key_woman') {
          this.state.update(s => ({ ...s, hasBeenToldToReallocate: true }));
        } else if (choiceId.includes('wrong')) {
          this.state.update(s => ({ ...s, isGlitched: true }));
          setTimeout(() => this.state.update(s => ({ ...s, isGlitched: false })), 500);
        }
      }

      if (npc.id === 'nervous_man') {
        if (choiceId === 'choice_reallocate') {
          // Debug: Temporarily bypass reallocation flag check
          this.state.update(s => ({ ...s, engineerDialogueStep: 1, activeNodeId: 'step2' }));
          return;
        } else if (choiceId.includes('correct')) {
          this.state.update(s => ({ ...s, engineerDialogueStep: s.engineerDialogueStep + 1, activeNodeId: choice.nextNodeId! }));
          return;
        } else if (choiceId.includes('wrong')) {
          this.state.update(s => ({ ...s, engineerDialogueStep: 0, isGlitched: true, activeNodeId: 'start' }));
          setTimeout(() => this.state.update(s => ({ ...s, isGlitched: false })), 500);
          return;
        }
      }

      if (npc.id === 'chef') {
        if (choiceId === 'chef_correct') {
          this.state.update(s => ({ ...s, chefDialogueStep: 1 }));
        } else if (choiceId.includes('fail')) {
          this.state.update(s => ({ ...s, chefDialogueStep: 0, isGlitched: true }));
          setTimeout(() => this.state.update(s => ({ ...s, isGlitched: false })), 500);
        }
      }

      this.state.update(s => ({ ...s, activeNodeId: choice.nextNodeId! }));
    }

    if (npc.id === 'terminal') {
      const hasReadDiary = this.state().inventory.includes('Staff Code');
      const lang = this.language();
      
      if (choiceId === 'terminal_code_1' && hasReadDiary) {
        this.state.update(s => ({ ...s, isBackdoorActive: true, activeNodeId: 'success' }));
        
        // Give endgame items
        this.state.update(s => {
          let newInventory = [...s.inventory];
          let isFlash = false;
          if (!newInventory.includes('Access Log')) {
            newInventory = [...newInventory, 'Access Log'];
            isFlash = true;
            this.addHistory(lang === 'it' ? 'Registro di Accesso scaricato. Vedi il tuo nome: "S. Vane".' : lang === 'es' ? 'Registro de Acceso descargado. Ves tu nombre: "S. Vane".' : 'Access Log downloaded. You see your name: "S. Vane".');
          }
          if (!newInventory.includes('Source Fragment')) {
            newInventory = [...newInventory, 'Source Fragment'];
            this.addHistory('Source Fragment found.');
          }
          return { ...s, inventory: newInventory, isFlashback: isFlash };
        });

        if (this.state().isFlashback) {
          setTimeout(() => this.state.update(s => ({ ...s, isFlashback: false })), 1000);
        }
      } else if (choiceId.startsWith('terminal_code_')) {
        this.state.update(s => ({ ...s, activeNodeId: 'fail' }));
        if (!hasReadDiary) {
          this.addHistory(lang === 'it' ? 'Accesso Negato. Identità sconosciuta.' : lang === 'es' ? 'Acceso Denegado. Identidad desconocida.' : 'Access Denied. Unknown identity.');
        }
      }
    }

    if (choiceId === 'final_end') {
      this.triggerTrueEnding();
      return;
    }

    if (choiceId === 'reset_uninformed' || choiceId === 'reset_informed') {
      this.resetGame();
      return;
    }

    if (choice.targetRoom) {
      if (choice.id === 'exit') {
        this.triggerFadeOut();
      } else {
        this.state.update(s => ({
          ...s,
          currentRoomId: choice.targetRoom!,
          discoveredRooms: s.discoveredRooms.includes(choice.targetRoom!) ? s.discoveredRooms : [...s.discoveredRooms, choice.targetRoom!],
          history: [...s.history, `--- ${ROOMS[choice.targetRoom!].title[lang]} ---`, this.getRoomDescription(ROOMS[choice.targetRoom!], lang)]
        }));
      }
    }
  }

  onMaintenanceLogicCrash() {
    const lang = this.language();
    const msg = lang === 'it' 
      ? 'Il manutentore se ne è andato. Hai raccolto il cacciavite arrugginito dal banco di lavoro.' 
      : lang === 'es' 
      ? 'El hombre de mantenimiento se ha ido. Has recogido el destornillador oxidado del banco de trabajo.' 
      : 'The maintenance man is gone. You collected the rusty screwdriver from the workbench.';
    
    this.state.update(s => {
      const newInventory = s.inventory.includes('Rusty Screwdriver') 
        ? s.inventory 
        : [...s.inventory, 'Rusty Screwdriver'];
        
      return { 
        ...s, 
        isMaintenanceManGone: true,
        activeNpcId: null,
        activeNodeId: null,
        inventory: newInventory,
        history: [...s.history, msg]
      };
    });
  }

  private triggerFadeOut() {
    this.state.update(s => ({ ...s, isFadingOut: true }));
    setTimeout(() => {
      this.state.update(s => ({
        ...s,
        currentRoomId: 'white',
        isFadingOut: false,
        discoveredRooms: s.discoveredRooms.includes('white') ? s.discoveredRooms : [...s.discoveredRooms, 'white'],
        history: [...s.history, `--- ${ROOMS['white'].title[s.language]} ---`, this.getRoomDescription(ROOMS['white'], s.language)]
      }));
    }, 2000);
  }

  enterWhiteRoom() {
    this.state.update(s => ({ ...s, isFadingOut: true }));
    setTimeout(() => {
      this.state.update(s => ({ 
        ...s, 
        isWhiteRoomActive: true, 
        isFadingOut: false,
        currentRoomId: 'white'
      }));
      // Play the final crash audio
      this.audio.playRoomBgm('white');
    }, 2000);
  }

  bootstrapReset() {
    this.state.update(s => ({ ...s, isFadingOut: true }));
    setTimeout(() => {
      this.resetGame();
      this.state.update(s => ({ ...s, isFadingOut: false }));
    }, 2000);
  }

  systemTermination() {
    this.openWhiteRoomSubMenu();
  }

  openWhiteRoomSubMenu() {
    this.state.update(s => ({ ...s, isWhiteRoomSubMenuOpen: true }));
  }

  selectBinaryOption(isCorrect: boolean) {
    if (isCorrect) {
      this.state.update(s => ({ ...s, isFinalTranslationShown: true }));
    } else {
      const lang = this.language();
      const msg = lang === 'it' 
        ? 'Sequenza non valida. Rilevato loop logico.' 
        : lang === 'es' 
        ? 'Secuencia no válida. Bucle lógico detectado.' 
        : 'Invalid sequence. Logic loop detected.';
      
      this.addHistory(msg);
      this.state.update(s => ({ ...s, isGlitched: true }));
      setTimeout(() => {
        this.state.update(s => ({ ...s, isGlitched: false }));
        this.bootstrapReset();
      }, 1000);
    }
  }

  triggerFinalExit() {
    this.triggerTrueEnding();
  }

  private triggerTrueEnding() {
    this.state.update(s => ({ ...s, isFadingOutBlack: true }));
    setTimeout(() => {
      this.state.update(s => ({ ...s, isGameOver: true, isFadingOutBlack: false }));
    }, 4000);
  }

  private addItem(item: string, historyMsg: string) {
    this.state.update(s => {
      if (s.inventory.includes(item)) return s;
      return { ...s, inventory: [...s.inventory, item], history: [...s.history, historyMsg] };
    });
  }

  private removeItem(item: string) {
    this.state.update(s => ({
      ...s,
      inventory: s.inventory.filter(i => i !== item)
    }));
  }

  private addHistory(msg: string) {
    this.state.update(s => ({ ...s, history: [...s.history, msg] }));
  }

  private shuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  resetGame() {
    this.state.update(s => ({
      ...s,
      currentRoomId: 'room404',
      inspectCounter: 0,
      memoryFragments: 0,
      inventory: [],
      unlockedRooms: ['room404', 'hall', 'corridor'],
      discoveredRooms: ['room404'],
      history: [...s.history, '--- RESET ---', this.getRoomDescription(ROOMS['room404'], s.language)],
      isGlitched: false,
      isFuseInserted: false,
      isPanelOpen: false,
      isBackdoorActive: false,
      hasObservedPainting: false,
      isGameOver: false,
      isFadingOutBlack: false,
      twinsDialogueStep: 0,
      isMaintenanceManGone: false,
      hasGivenTea: false,
      hasBeenToldToReallocate: false,
      engineerDialogueStep: 0,
      hasBinaryFragment: false,
      isWhiteRoomActive: false,
      isWhiteRoomSubMenuOpen: false,
      isFinalTranslationShown: false
    }));
  }

  private getRoomDescription(room: Room, lang: Language): string {
    return room.description[lang];
  }
}
