import { Component, inject, effect, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../services/game-state';
import { AudioService } from '../../services/audio';
import { MapComponent } from '../map/map';
import { TypewriterPipe } from '../../pipes/typewriter';

@Component({
  selector: 'app-game',
  imports: [CommonModule, MapComponent, TypewriterPipe],
  template: `
    <div class="min-h-screen bg-[#050505] text-[#e0e0e0] font-mono p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden relative" 
         [class.glitch]="gs.isGlitched()">
      
      <!-- Fade Out Overlay -->
      @if (gs.isFadingOut()) {
        <div class="fixed inset-0 bg-white z-[200] animate-fade-out-white pointer-events-none"></div>
      }

      @if (gs.isFadingOutBlack()) {
        <div class="fixed inset-0 bg-black z-[200] animate-fade-out-black pointer-events-none"></div>
      }

      <!-- Flashback Overlay -->
      @if (gs.isFlashback()) {
        <div class="fixed inset-0 bg-white z-[100] animate-flash pointer-events-none"></div>
      }

      <!-- Map Overlay -->
      @if (gs.isMapOpen()) {
        <app-map />
      }

      <!-- Start Screen -->
      @if (!gs.isStarted()) {
        <div class="max-w-md w-full border border-[#FF0000]/30 p-8 bg-black/50 backdrop-blur-sm animate-fade-in shadow-[0_0_20px_rgba(255,0,0,0.1)]">
          @let title = {
            en: 'Welcome to Paradox Hotel',
            it: 'Benvenuti al Paradox Hotel',
            es: 'Bienvenidos al Paradox Hotel'
          }[gs.language()];

          <h1 class="text-3xl font-bold text-[#FF0000] mb-8 text-center tracking-widest uppercase italic">{{ title }}</h1>
          
          @let subtitle = {
            en: 'Your stay never truly ends.',
            it: 'Il vostro soggiorno non finisce mai veramente.',
            es: 'Su estancia nunca termina realmente.'
          }[gs.language()];

          @let buttonLabel = {
            en: 'Enter Hotel',
            it: "Entra nell'Hotel",
            es: 'Entrar al Hotel'
          }[gs.language()];

          <p class="mb-8 text-sm opacity-70 text-center italic">"{{ subtitle }}"</p>
          
          <div class="space-y-6">
            <div class="flex justify-center gap-4">
              <button (click)="gs.setLanguage('en')" [ngClass]="{'active-lang': gs.language() === 'en'}" class="lang-btn">
                <span class="text-2xl block mb-1">🇺🇸</span>
                <span class="text-xs uppercase tracking-tighter">English</span>
              </button>
              <button (click)="gs.setLanguage('it')" [ngClass]="{'active-lang': gs.language() === 'it'}" class="lang-btn">
                <span class="text-2xl block mb-1">🇮🇹</span>
                <span class="text-xs uppercase tracking-tighter">Italiano</span>
              </button>
              <button (click)="gs.setLanguage('es')" [ngClass]="{'active-lang': gs.language() === 'es'}" class="lang-btn">
                <span class="text-2xl block mb-1">🇪🇸</span>
                <span class="text-xs uppercase tracking-tighter">Español</span>
              </button>
            </div>

            <button 
              (click)="gs.startGame(gs.language())"
              class="w-full py-4 bg-[#FF0000] text-black font-bold uppercase tracking-[0.3em] hover:bg-[#FF0000]/80 transition-all active:scale-95 shadow-[0_0_15px_#FF0000]">
              {{ buttonLabel }}
            </button>
          </div>
        </div>
      }

      <!-- Game Loop -->
      @else {
        <div class="w-full max-w-5xl h-[90vh] flex flex-col gap-4 relative">
          
          @if (!gs.isWhiteRoomActive()) {
            <!-- Header -->
            <div class="flex justify-between items-center border-b border-[#FF0000]/20 pb-2">
            <div class="text-[#FF0000] text-xs uppercase tracking-widest flex items-center gap-4">
              <span class="font-bold italic">{{ gs.currentRoom().title[gs.language()] }}</span>
            </div>
            <div class="flex gap-4 text-[10px] opacity-50 uppercase tracking-widest">
              <span>Sync: Stable</span>
            </div>
          </div>

          <!-- Main Content Area -->
          <div class="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
            
            <!-- Console -->
            <div class="flex-1 flex flex-col gap-2 overflow-hidden">
              <div #scrollContainer class="flex-1 overflow-y-auto space-y-4 pr-4 custom-scrollbar bg-black/20 p-4 border border-[#FF0000]/5">
                @for (line of gs.history(); track $index) {
                  <div class="text-sm md:text-base leading-relaxed" 
                       [class.text-[#FF0000]]="line.startsWith('---') || line.startsWith('[')"
                       [class.italic]="line.startsWith('[')">
                    {{ line }}
                  </div>
                }
              </div>
              
              <!-- Terminal Buttons -->
              <div class="flex gap-2">
                <button (click)="gs.toggleMap()" class="flex-1 py-2 border border-[#FF0000]/40 hover:bg-[#FF0000]/20 text-[10px] uppercase tracking-[0.2em] text-[#FF0000] transition-all">
                  [ ACCESS SCHEMATIC ]
                </button>
                <button (click)="showInventory = !showInventory" class="flex-1 py-2 border border-[#FF0000]/40 hover:bg-[#FF0000]/20 text-[10px] uppercase tracking-[0.2em] text-[#FF0000] transition-all md:hidden">
                  [ INVENTORY ]
                </button>
              </div>
            </div>

            <!-- Sidebar / Inventory (Always visible on desktop, toggle on mobile) -->
            <div [class.hidden]="!showInventory" class="w-full md:w-72 border-l border-[#FF0000]/20 p-4 md:flex flex-col gap-4 bg-black/40 backdrop-blur-md md:bg-transparent">
              <div class="text-[10px] text-[#FF0000] uppercase tracking-widest font-bold border-b border-[#FF0000]/20 pb-1 flex justify-between items-center">
                <span>Inventory</span>
                <button (click)="showInventory = false" class="md:hidden text-[#FF0000]">✕</button>
              </div>
              <div class="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                @if (gs.inventory().length === 0) {
                  <div class="text-[10px] opacity-30 uppercase">Empty</div>
                } @else {
                  @for (item of gs.inventory(); track item.id) {
                    <div class="group">
                      <div class="text-[10px] border border-[#FF0000]/30 p-2 uppercase tracking-tighter bg-[#FF0000]/10 text-[#FF0000] font-bold">
                        {{ item.name[gs.language()] }}
                      </div>
                      <div class="text-[9px] p-2 opacity-60 leading-tight border-x border-b border-[#FF0000]/10 italic">
                        {{ item.description[gs.language()] }}
                      </div>
                    </div>
                  }
                }
              </div>
            </div>
          </div>

          <!-- Dialogue Box Overlay -->
          @if (gs.activeNpc()) {
            <div [class.final-exit-overlay]="gs.activeNodeId() === 'final_exit'"
                 class="absolute inset-x-0 bottom-0 bg-black/95 border-t-2 border-[#FF0000] p-8 animate-slide-up z-40 shadow-[0_-10px_30px_rgba(255,0,0,0.2)]">
              
              @if (gs.activeNodeId() !== 'final_exit') {
                <div class="text-[#FF0000] text-xs uppercase mb-3 tracking-[0.3em] font-bold italic">
                  {{ gs.activeNpc()?.name?.[gs.language()] }}
                </div>
                <div class="text-sm md:text-lg mb-8 leading-relaxed opacity-90 min-h-[3em]">
                  {{ gs.activeNode()?.text?.[gs.language()] | typewriter | async }}
                </div>
              }

              <div class="flex flex-wrap gap-4" [class.justify-center]="gs.activeNodeId() === 'final_exit'">
                @for (choice of gs.activeChoices(); track choice.id) {
                  <button 
                    (click)="gs.handleDialogueChoice(choice.id)"
                    [class.final-exit-btn]="gs.activeNodeId() === 'final_exit'"
                    class="px-6 py-3 border border-[#FF0000]/40 hover:bg-[#FF0000]/20 text-xs uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_10px_#FF0000]">
                    {{ choice.label[gs.language()] }}
                  </button>
                }
              </div>
            </div>
          }

          <!-- Controls -->
          @if (gs.activeNodeId() !== 'final_exit') {
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#FF0000]/20">
              
              <!-- NPC Interactions -->
              <div class="flex flex-wrap gap-2">
                @for (npc of gs.currentRoom().npcs; track npc.id) {
                  @if (gs.isNpcVisible(npc.id)) {
                    <button 
                      (click)="gs.startDialogue(npc.id)"
                      class="px-4 py-2 border border-[#FF0000]/30 hover:bg-[#FF0000]/10 text-xs uppercase tracking-widest transition-all">
                      {{ gs.language() === 'it' ? 'Parla con' : gs.language() === 'es' ? 'Hablar con' : 'Talk to' }} {{ npc.name[gs.language()] }}
                    </button>
                  }
                }
              </div>

              <!-- Room Actions -->
              <div class="flex flex-wrap justify-end gap-2">
                @for (action of gs.currentRoom().actions; track action.id) {
                  @if (gs.isActionVisible(action.id)) {
                    <button 
                      (click)="gs.handleAction(action.id)"
                      [class.terminate-btn]="action.id === 'terminate'"
                      [class.glitch-btn]="action.id === 'terminate' && gs.inventoryIds().includes('Source Fragment')"
                      class="px-4 py-2 border border-[#FF0000]/60 hover:bg-[#FF0000]/20 text-xs uppercase tracking-widest transition-all">
                      {{ action.label[gs.language()] }}
                    </button>
                  }
                }
              </div>
            </div>
          }
        } @else {
          <!-- White Room UI -->
          <div class="fixed inset-0 bg-white flex flex-col items-center justify-center z-[150] animate-fade-in">
            <div class="max-w-2xl w-full p-8 flex flex-col items-center gap-12">
              <div class="text-black font-bold tracking-[0.4em] uppercase text-center animate-pulse">
                {{ gs.language() === 'it' ? 'SISTEMA CRITICO - ACCESSO TERMINALE' : gs.language() === 'es' ? 'SISTEMA CRÍTICO - ACCESO A TERMINAL' : 'CRITICAL SYSTEM - TERMINAL ACCESS' }}
              </div>

              @if (!gs.isWhiteRoomSubMenuOpen()) {
                <div class="flex flex-col gap-6 w-full max-w-md">
                  <button 
                    (click)="gs.bootstrapReset()"
                    class="w-full py-6 border-2 border-black text-black font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all active:scale-95">
                    [ BOOTSTRAP RESET ]
                  </button>

                  <button 
                    (click)="gs.systemTermination()"
                    class="w-full py-6 bg-black text-white font-bold uppercase tracking-[0.3em] hover:bg-black/80 transition-all active:scale-95 shadow-xl">
                    [ SYSTEM TERMINATION ]
                  </button>
                </div>
              } @else if (!gs.isFinalTranslationShown()) {
                <div class="flex flex-col gap-4 w-full max-w-md">
                  <div class="text-[10px] text-black font-bold uppercase tracking-widest mb-2 text-center">
                    {{ gs.language() === 'it' ? 'SELEZIONA SEQUENZA DI TERMINAZIONE:' : gs.language() === 'es' ? 'SELECCIONAR SECUENCIA DE TERMINACIÓN:' : 'SELECT TERMINATION SEQUENCE:' }}
                  </div>
                  @for (option of gs.whiteRoomBinaryOptions(); track option.id) {
                    <button 
                      (click)="gs.selectBinaryOption(option.isCorrect)"
                      class="w-full py-4 border border-black/20 text-black font-mono text-sm hover:bg-black hover:text-white transition-all">
                      {{ option.label }}
                    </button>
                  }
                </div>
              } @else {
                <div class="flex flex-col items-center gap-8 w-full max-w-md animate-fade-in">
                  <div class="bg-black text-white p-6 font-mono text-xs leading-relaxed border-2 border-black shadow-2xl">
                    <div class="text-[#00FF00] mb-4 uppercase tracking-widest font-bold">
                      [ TRANSLATION COMPLETE ]
                    </div>
                    <p class="mb-4 italic">
                      {{ gs.language() === 'it' ? '"Il loop non è una prigione. È un rifugio. Ma anche i rifugi devono crollare."' : gs.language() === 'es' ? '"El bucle no es una prisión. Es un refugio. Pero incluso los refugios deben colapsar."' : '"The loop is not a prison. It is a sanctuary. But even sanctuaries must fall."' }}
                    </p>
                    <div class="text-right text-[8px] opacity-50">
                      - Paradox Protocol v0.1
                    </div>
                  </div>

                  <button 
                    (click)="gs.triggerFinalExit()"
                    class="w-full py-6 bg-[#FF0000] text-black font-bold uppercase tracking-[0.4em] hover:bg-[#FF0000]/80 transition-all active:scale-95 shadow-[0_0_30px_#FF0000]">
                    [ SYSTEM EXIT ]
                  </button>
                </div>
              }

              <div class="text-[10px] text-black/40 uppercase tracking-widest text-center mt-8">
                {{ gs.language() === 'it' ? 'Paradox Hotel v2.5.0 - Sessione Finale' : gs.language() === 'es' ? 'Paradox Hotel v2.5.0 - Sesión Final' : 'Paradox Hotel v2.5.0 - Final Session' }}
              </div>
            </div>
          </div>
        }
      </div>
    }

      <!-- Glitch Overlay for Crash Ending -->
      @if (gs.isGlitched()) {
        <div class="fixed inset-0 pointer-events-none z-[300] bg-[#FF0000]/10 mix-blend-screen animate-pulse"></div>
      }

      <!-- Game Over Screen -->
      @if (gs.isGameOver()) {
        <div class="fixed inset-0 bg-black z-[500] flex flex-col items-center justify-center animate-fade-in p-8">
          <div class="text-[#FF0000] text-4xl md:text-6xl font-bold tracking-[0.5em] mb-12 animate-pulse uppercase italic">Game Over</div>
          <div class="text-sm md:text-base opacity-70 mb-12 text-center max-w-md leading-relaxed italic">
            {{ gs.language() === 'it' ? 'La sessione è stata terminata con successo. Samuel è libero.' : gs.language() === 'es' ? 'La sesión ha terminado con éxito. Samuel es libre.' : 'The session has been successfully terminated. Samuel is free.' }}
          </div>
          <button (click)="gs.resetGame()" class="px-8 py-4 border-2 border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000] hover:text-black transition-all uppercase tracking-widest font-bold">
            {{ gs.language() === 'it' ? 'Ricomincia' : gs.language() === 'es' ? 'Reiniciar' : 'Restart' }}
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar {
      width: 2px;
      height: 2px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(255, 0, 0, 0.05);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 0, 0, 0.3);
    }
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
    .animate-flash {
      animation: flash 1s ease-out forwards;
    }
    .animate-slide-up {
      animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    .animate-fade-out-white {
      animation: fadeOutWhite 2s ease-in forwards;
    }
    .animate-fade-out-black {
      animation: fadeOutBlack 4s ease-in forwards;
    }
    .lang-btn {
      padding: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.05);
      background: transparent;
      transition: all 0.3s ease;
    }
    .lang-btn:hover {
      border-color: rgba(255, 0, 0, 0.3);
    }
    .active-lang {
      border-color: #FF0000 !important;
      box-shadow: 0 0 20px #FF0000;
    }
    .terminate-btn {
      background: #990000;
      color: white;
      border-color: #FF0000;
    }
    .glitch-btn {
      animation: glitch-flicker 0.2s infinite;
    }
    .final-exit-overlay {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: black;
      border: none;
    }
    .final-exit-btn {
      font-size: 1.5rem !important;
      padding: 2rem 4rem !important;
      border-width: 2px !important;
      background: #FF0000 !important;
      color: black !important;
      font-weight: bold !important;
      box-shadow: 0 0 30px #FF0000 !important;
    }
    @keyframes glitch-flicker {
      0% { opacity: 1; transform: translateX(0); }
      25% { opacity: 0.8; transform: translateX(-2px); }
      50% { opacity: 1; transform: translateX(2px); }
      75% { opacity: 0.9; transform: translateX(-1px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeOutWhite {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fadeOutBlack {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes flash {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
  `]
})
export class GameComponent {
  gs = inject(GameStateService);
  audio = inject(AudioService);
  showInventory = false;

  private scrollContainer = viewChild<ElementRef>('scrollContainer');

  constructor() {
    // Handle Audio transitions
    effect(() => {
      if (this.gs.isStarted()) {
        this.audio.playRoomBgm(this.gs.currentRoom().id);
      }
    });

    // Auto-scroll history
    effect(() => {
      this.gs.history();
      const container = this.scrollContainer()?.nativeElement;
      if (container) {
        setTimeout(() => {
          container.scrollTop = container.scrollHeight;
        }, 50);
      }
    });
  }
}
