import { Room, Item } from '../models/interfaces';

export const ITEMS: Record<string, Item> = {
  'Tattered Note': { 
    id: 'Tattered Note', 
    name: { en: 'Tattered Note', it: 'Biglietto Spiegazzato', es: 'Nota Arrugada' },
    description: { 
      en: 'A small piece of paper. It says: "Wake up, Samuel."', 
      it: 'Un piccolo pezzo di carta. Dice: "Svegliati, Samuel."', 
      es: 'Un pequeño trozo de papel. Dice: "Despierta, Samuel."' 
    }
  },
  'Elegant Tea': { 
    id: 'Elegant Tea', 
    name: { en: 'Hot Tea', it: 'Tè Caldo', es: 'Té Caliente' },
    description: { 
      en: 'A steaming cup of high-quality hot tea.', 
      it: 'Una tazza di tè fumante di alta qualità.', 
      es: 'Una taza de té humeante de alta calidad.' 
    }
  },
  'Room 202 Key': { 
    id: 'Room 202 Key', 
    name: { en: 'Room 202 Key', it: 'Chiave Stanza 202', es: 'Llave Habitación 202' },
    description: { 
      en: 'A standard hotel key with "202" engraved on it.', 
      it: 'Una normale chiave d\'hotel con "202" inciso sopra.', 
      es: 'Una llave de hotel estándar con "202" grabado.' 
    }
  },
  'Engineering Badge': { 
    id: 'Engineering Badge', 
    name: { en: 'Engineering Badge', it: 'Distintivo da Ingegnere', es: 'Insignia de Ingeniero' },
    description: { 
      en: "Samuel's identity, or what's left of it.", 
      it: "L'identità di Samuel, o quello che ne resta.", 
      es: "La identidad de Samuel, o lo que queda de ella." 
    }
  },
  'Suite 500 Key': { 
    id: 'Suite 500 Key', 
    name: { en: 'Suite 500 Key', it: 'Chiave Suite 500', es: 'Llave Suite 500' },
    description: { 
      en: 'A heavy key for the most exclusive room.', 
      it: 'Una chiave pesante per la stanza più esclusiva.', 
      es: 'Una llave pesada para la habitación más exclusiva.' 
    }
  },
  'Old Diary': { 
    id: 'Old Diary', 
    name: { en: 'Old Diary', it: 'Vecchio Diario', es: 'Diario Viejo' },
    description: { 
      en: 'A leather-bound diary. Page 102 contains a circled number: 1024.', 
      it: 'Un diario rilegato in pelle. Pagina 102 contiene un numero cerchiato: 1024.', 
      es: 'Un diario encuadernado en cuero. La página 102 contiene un número rodeado con un círculo: 1024.' 
    }
  },
  'Staff Code': { 
    id: 'Staff Code', 
    name: { en: 'Staff Code', it: 'Codice Personale', es: 'Código de Personal' },
    description: { 
      en: 'The sequence 1024. It seems important.', 
      it: 'La sequenza 1024. Sembra importante.', 
      es: 'La secuencia 1024. Parece importante.' 
    }
  },
  'Access Log': { 
    id: 'Access Log', 
    name: { en: 'Access Log', it: 'Registro di Accesso', es: 'Registro de Acceso' },
    description: { 
      en: 'A digital log showing system entries. Your name is listed.', 
      it: 'Un registro digitale che mostra gli accessi al sistema. Il tuo nome è in lista.', 
      es: 'Un registro digital que muestra las entradas al sistema. Tu nombre aparece en la lista.' 
    }
  },
  'Source Fragment': { 
    id: 'Source Fragment', 
    name: { en: 'Source Fragment', it: 'Frammento Sorgente', es: 'Frammento Fuente' },
    description: { 
      en: 'A glowing piece of code. It feels unstable.', 
      it: 'Un pezzo di codice luminoso. Sembra instabile.', 
      es: 'Un trozo de código brillante. Parece inestable.' 
    }
  },
  'Rusty Screwdriver': { 
    id: 'Rusty Screwdriver', 
    name: { en: 'Rusty Screwdriver', it: 'Cacciavite Arrugginito', es: 'Destornillador Oxidado' },
    description: { 
      en: 'An old tool. Still functional enough to open panels.', 
      it: 'Un vecchio attrezzo. Ancora abbastanza funzionale per aprire pannelli.', 
      es: 'Una herramienta vieja. Todavía lo suficientemente funcional como para abrir paneles.' 
    }
  },
  'Electric Fuse': { 
    id: 'Electric Fuse', 
    name: { en: 'Electric Fuse', it: 'Fusibile Elettrico', es: 'Fusible Eléctrico' },
    description: { 
      en: 'A high-capacity fuse. Needed to restore power.', 
      it: 'Un fusibile ad alta capacità. Necessario per ripristinare la corrente.', 
      es: 'Un fusible de alta capacidad. Necesario para restaurar la energía.' 
    }
  },
};

export const ROOMS: Record<string, Room> = {
  room404: {
    id: 'room404',
    title: { en: 'Room 404', it: 'Stanza 404', es: 'Habitación 404' },
    description: {
      en: 'The silence is heavy. A single metal bed sits in the center of the room. The walls are a pale, sickly white.',
      it: 'Il silenzio è pesante. Un singolo letto di metallo siede al centro della stanza. Le pareti sono di un bianco pallido e malaticcio.',
      es: 'El silencio es pesado. Una sola cama de metal se encuentra en el centro de la habitación. Las paredes son de un blanco pálido y enfermizo.'
    },
    ambientAudio: 'hallway_loop_404.mp3',
    actions: [
      { id: 'inspect_bed', label: { en: 'Inspect Bed', it: 'Ispeziona Letto', es: 'Inspeccionar Cama' } },
      { id: 'exit_room404', label: { en: 'Exit to Corridor', it: 'Esci nel Corridoio', es: 'Salir al Pasillo' }, targetRoom: 'corridor' }
    ]
  },
  hall: {
    id: 'hall',
    title: { en: 'The Grand Hall', it: 'Il Gran Salone', es: 'El Gran Salón' },
    description: {
      en: 'A vast, echoing space. Dust motes dance in the dim light. An elegant woman sits by the fireplace, and a barman polishes glasses at the counter.',
      it: 'Uno spazio vasto ed echeggiante. Granelli di polvere danzano nella luce fioca. Una donna elegante siede accanto al camino, e un barista lucida i bicchieri al bancone.',
      es: 'Un spazio vasto y resonante. Motas de polvo bailan en la penumbra. Una mujer elegante se sienta junto a la chimenea, y un barman pule vasos en el mostrador.'
    },
    ambientAudio: 'grand_lounge_social_process.mp3',
    npcs: [
      {
        id: 'woman',
        name: { en: 'Elegant Woman', it: 'Donna Elegante', es: 'Mujer Elegante' },
        initialNodeId: 'start',
        dialogueNodes: {
          start: {
            id: 'start',
            text: {
              en: '"It is so cold in here. If only I had a warm cup of tea..."',
              it: '"Fa così freddo qui dentro. Se solo avessi una tazza di tè caldo..."',
              es: '"Hace tanto frío aquí. Si tan solo tuviera una taza de té caliente..." '
            },
            choices: [
              { id: 'give_tea', label: { en: 'Give Tea', it: 'Dai il Tè', es: 'Dar Té' }, requiredItem: 'Elegant Tea', nextNodeId: 'woman_step1' },
              { id: 'end', label: { en: 'I will see what I can do', it: 'Vedrò cosa posso fare', es: 'Veré qué puedo hacer' }, endsDialogue: true }
            ]
          },
          woman_step1: {
            id: 'woman_step1',
            text: {
              en: '"Thank you, dear. The warmth... it makes me remember. You remind me of someone."',
              it: '"Grazie, caro. Il calore... mi fa ricordare. Mi ricordi qualcuno."',
              es: '"Gracias, querido. El calor... me hace recordar. Me recuerdas a alguien."'
            },
            choices: [
              { id: 'woman_1_correct', label: { en: '"People say that to me often."', it: '"Me lo dicono spesso."', es: '"Me lo dicen a menudo."' }, nextNodeId: 'woman_step2' },
              { id: 'woman_1_wrong1', label: { en: '"What do you do here all day?"', it: '"Cosa fai qui tutto il giorno?"', es: '"¿Qué haces aquí todo el día?"' }, nextNodeId: 'woman_fail' },
              { id: 'woman_1_wrong2', label: { en: '"I don\'t know who I am."', it: '"Non so chi sono."', es: '"No sé quién soy."' }, nextNodeId: 'woman_fail' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          woman_step2: {
            id: 'woman_step2',
            text: {
              en: '"You have the look of someone trying to leave... to interrupt the flow."',
              it: '"Hai l\'aspetto di qualcuno che cerca di andarsene... di interrompere il flusso."',
              es: '"Tienes el aspecto de alguien que intenta irse... de interrumpir el flujo."'
            },
            choices: [
              { id: 'woman_2_correct', label: { en: '"That is not my intention."', it: '"Non è mia intenzione."', es: '"Esa no es mi intención."' }, nextNodeId: 'woman_step3' },
              { id: 'woman_2_wrong1', label: { en: '"Would that be a problem?"', it: '"Sarebbe un problema?"', es: '"¿Sería eso un problema?"' }, nextNodeId: 'woman_fail' },
              { id: 'woman_2_wrong2', label: { en: '"You should walk more to stay warm."', it: '"Dovresti camminare di più per stare al caldo."', es: '"Deberías caminar más para mantenerte caliente."' }, nextNodeId: 'woman_fail' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          woman_step3: {
            id: 'woman_step3',
            text: {
              en: '"Very well. You will need a Role assigned to you if you wish to stay here without being deleted."',
              it: '"Molto bene. Avrai bisogno di un Incarico assegnato se desideri restare qui senza essere cancellato."',
              es: '"Muy bien. Necesitarás una Asignación si deseas quedarte aquí sin ser borrado."'
            },
            choices: [
              { id: 'woman_3_correct', label: { en: '"I don\'t know what that is."', it: '"Non so cosa sia."', es: '"No sé qué es eso."' }, nextNodeId: 'woman_step4' },
              { id: 'woman_3_wrong1', label: { en: '"I was waiting for exactly that."', it: '"Stavo aspettando proprio questo."', es: '"Estaba esperando exactamente eso."' }, nextNodeId: 'woman_fail' },
              { id: 'woman_3_wrong2', label: { en: '"What do I need it for?"', it: '"A cosa mi serve?"', es: '"¿Para qué lo necesito?"' }, nextNodeId: 'woman_fail' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          woman_step4: {
            id: 'woman_step4',
            text: {
              en: '"Take this. The man in Room 202 is an Engineer; he will know how to reallocate you."',
              it: '"Prendi questa. L\'uomo nella Stanza 202 è un Ingegnere; saprà come riallocarti."',
              es: '"Toma esto. El hombre de la Habitación 202 es un Ingeniero; él sabrá cómo reubicarte."'
            },
            choices: [
              { id: 'take_key_woman', label: { en: 'Take Key', it: 'Prendi la Chiave', es: 'Tomar Llave' }, givesItem: 'Room 202 Key', unlocksRoom: 'room202', endsDialogue: true },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          woman_fail: {
            id: 'woman_fail',
            text: {
              en: '"The woman sighs: \'You are losing focus, dear. Let us start over.\'"',
              it: '"La donna sospira: \'Stai perdendo la concentrazione, caro. Ricominciamo.\'"',
              es: '"La mujer suspira: \'Estás perdiendo la concentración, querido. Empecemos de nuevo.\'"'
            },
            choices: [
              { id: 'restart', label: { en: 'Try again', it: 'Riprova', es: 'Intentar de nuevo' }, nextNodeId: 'woman_step1' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          completed: {
            id: 'completed',
            text: {
              en: '"The tea was lovely. Go find the Engineer."',
              it: '"Il tè era delizioso. Vai a cercare l\'Ingegnere."',
              es: '"El té estaba delicioso. Ve a buscar al Ingeniero."'
            },
            choices: [
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          }
        }
      },
      {
        id: 'barman',
        name: { en: 'The Barman', it: 'Il Barista', es: 'El Barman' },
        initialNodeId: 'start',
        dialogueNodes: {
          start: {
            id: 'start',
            text: {
              en: '"The hotel is quiet tonight. Can I get you something?"',
              it: '"L\'hotel è tranquillo stasera. Posso portarti qualcosa?"',
              es: '"El hotel está tranquilo esta noche. ¿Puedo traerte algo?"'
            },
            choices: [
              { id: 'ask_tea', label: { en: 'The lady needs tea', it: 'La signora ha bisogno di tè', es: 'La señora necesita té' }, nextNodeId: 'kitchen_access' },
              { id: 'ask_basement', label: { en: 'I need to go to the Basement', it: 'Devo andare nel Seminterrato', es: 'Necesito ir al Sótano' }, nextNodeId: 'basement_check' },
              { id: 'end', label: { en: 'Not now', it: 'Non ora', es: 'Ahora no' }, endsDialogue: true }
            ]
          },
          kitchen_access: {
            id: 'kitchen_access',
            text: {
              en: '"Heat is not within my jurisdiction, Sir. I will unlock access to the Kitchen for you. Be wary of the Chef: he does not care for undocumented intrusions."',
              it: '"Il calore non è di mia competenza, Signore. Le sbloccherò l\'accesso per la cucina. Stia attento allo Chef: non ama le intrusioni poco documentate."',
              es: '"El calor no es de mi competencia, Señor. Le desbloquearé el acceso a la cocina. Tenga cuidado con el Chef: no le gustan las intrusiones poco documentadas."'
            },
            choices: [
              { id: 'end', label: { en: 'Thank you', it: 'Grazie', es: 'Gracias' }, unlocksRoom: 'kitchen', endsDialogue: true }
            ]
          },
          basement_check: {
            id: 'basement_check',
            text: {
              en: '"The Basement? That is for staff only. Unless you have authorization..."',
              it: '"Il Seminterrato? È solo per il personale. A meno che tu non abbia l\'autorizzazione..."',
              es: '"¿El Sótano? Eso es solo para el personal. A menos que tengas autorización..."'
            },
            choices: [
              { id: 'show_badge', label: { en: 'Show Badge', it: 'Mostra Distintivo', es: 'Mostrar Insignia' }, requiredItem: 'Engineering Badge', nextNodeId: 'access_granted', unlocksRoom: 'basement' },
              { id: 'no_badge', label: { en: 'I don\'t have it', it: 'Non ce l\'ho', es: 'No lo tengo' }, nextNodeId: 'access_denied' }
            ]
          },
          access_granted: {
            id: 'access_granted',
            text: {
              en: '"My apologies. I did not recognize you. The Basement is open."',
              it: '"Le mie scuse. Non l\'avevo riconosciuta. Il Seminterrato è aperto."',
              es: '"Mis disculpas. No le reconocí. El Sótano está abierto."'
            },
            choices: [{ id: 'end', label: { en: 'Thanks', it: 'Grazie', es: 'Gracias' }, endsDialogue: true }]
          },
          access_denied: {
            id: 'access_denied',
            text: {
              en: '"Then I cannot help you."',
              it: '"Allora non posso aiutarla."',
              es: '"Entonces no posso ayudarle."'
            },
            choices: [{ id: 'end', label: { en: 'Understood', it: 'Ricevuto', es: 'Entendido' }, endsDialogue: true }]
          }
        }
      },
      {
        id: 'concierge',
        name: { en: 'The Concierge', it: 'Il Portiere', es: 'El Conserje' },
        initialNodeId: 'start',
        dialogueNodes: {
          start: {
            id: 'start',
            text: {
              en: '"Welcome back to the Paradox Hotel, Sir. I trust your stay here will be to your liking."',
              it: '"Bentornato al Paradox Hotel, Signore. Spero che la sua permanenza qui sia di suo gradimento."',
              es: '"Bienvenido de nuevo al Paradox Hotel, Señor. Espero que su estancia aquí sea de su agrado."'
            },
            choices: [
              { id: 'end', label: { en: 'Yes, thank you', it: 'Sì, grazie', es: 'Sí, gracias' }, endsDialogue: true }
            ]
          },
          climax: {
            id: 'climax',
            text: {
              en: '"It has been a pleasure serving you, Sir. We will be waiting for you here upon your return, as always."',
              it: '"È stato un piacere servirla, Signore. La aspetteremo qui al suo ritorno, come sempre."',
              es: '"Ha sido un placer servirle, Señor. Le estaremos esperando aquí a su regreso, como siempre."'
            },
            choices: [
              { id: 'exit_climax', label: { 
                en: "Thanks for the thought, but don't count on it. I prefer one-way trips.", 
                it: "Grazie del pensiero, ma non ci conti. Mi piacciono i viaggi senza ritorno.", 
                es: "Gracias por el detalle, pero no cuente con ello. Prefiero los viajes sin retorno." 
              }, nextNodeId: 'final_exit' }
            ]
          },
          final_exit: {
            id: 'final_exit',
            text: {
              en: '...',
              it: '...',
              es: '...'
            },
            choices: [
              { id: 'exit_hotel_final', label: { en: 'EXIT THE PARADOX HOTEL', it: 'ESCI DAL PARADOX HOTEL', es: 'SALIR DEL PARADOX HOTEL' }, endsDialogue: true }
            ]
          }
        }
      }
    ],
    actions: [
      { id: 'inspect_painting', label: { en: 'Inspect Painting', it: 'Ispeziona Dipinto', es: 'Inspeccionar Cuadro' } },
      { id: 'go_corridor', label: { en: 'Go to Corridor', it: 'Vai al Corridoio', es: 'Ir al Pasillo' }, targetRoom: 'corridor' },
      { id: 'go_kitchen', label: { en: 'Go to Kitchen', it: 'Vai in Cucina', es: 'Ir a la Cocina' }, targetRoom: 'kitchen' },
      { id: 'go_basement', label: { en: 'Go to Basement', it: 'Vai al Seminterrato', es: 'Ir al Sótano' }, targetRoom: 'basement' },
      { id: 'exit_hotel', label: { en: 'EXIT HOTEL', it: 'ESCI DALL\'HOTEL', es: 'SALIR DEL HOTEL' }, isSecret: true }
    ]
  },
  corridor: {
    id: 'corridor',
    title: { en: 'The Endless Corridor', it: 'Il Corridoio Infinito', es: 'El Pasillo Infinito' },
    description: {
      en: 'The hallway seems to stretch further than it should. Two young girls stand perfectly still at the end of the hall.',
      it: 'Il corridoio sembra allungarsi più di quanto dovrebbe. Due ragazzine stanno perfettamente immobili in fondo al corridoio.',
      es: 'El pasillo parece estirarse más de lo que debería. Dos niñas permanecen perfectamente quietas al final del pasillo.'
    },
    ambientAudio: 'hallway_loop_404.mp3',
    npcs: [
      {
        id: 'maid',
        name: { en: 'The Maid', it: 'La Cameriera', es: 'La Camarera' },
        initialNodeId: 'start',
        dialogueNodes: {
          start: {
            id: 'start',
            text: {
              en: '"I am busy cleaning. Suite 500 is off-limits for guests."',
              it: '"Sono impegnata a pulire. La Suite 500 è vietata agli ospiti."',
              es: '"Estoy ocupada limpiando. La Suite 500 está fuera del alcance de los huéspedes."'
            },
            choices: [
              { id: 'inspection', label: { en: "I'm here for a technical inspection.", it: "Sono qui per un'ispezione tecnica.", es: "Estoy aquí para una inspección técnica." }, requiredItem: 'Engineering Badge', nextNodeId: 'give_key' },
              { id: 'end', label: { en: 'Sorry to bother you', it: 'Scusa il disturbo', es: 'Siento molestarte' }, endsDialogue: true }
            ]
          },
          give_key: {
            id: 'give_key',
            text: {
              en: '"Oh, I see. Here is the key. Be quick."',
              it: '"Oh, capisco. Ecco la chiave. Faccia in fretta."',
              es: '"Oh, ya veo. Aquí tiene la llave. Sea rápido."'
            },
            choices: [
              { id: 'take_suite_key', label: { en: 'Take Suite 500 Key', it: 'Prendi la Chiave Suite 500', es: 'Tomar Llave Suite 500' }, givesItem: 'Suite 500 Key', unlocksRoom: 'suite500', endsDialogue: true }
            ]
          }
        }
      },
      {
        id: 'twins',
        name: { en: 'The Twins', it: 'Le Gemelle', es: 'Las Gemelas' },
        initialNodeId: 'start',
        dialogueNodes: {
          start: {
            id: 'start',
            text: {
              en: '"Samuel... you\'re back."',
              it: '"Samuel... sei tornato."',
              es: '"Samuel... has vuelto."'
            },
            choices: [
              { id: 'twins_1_correct', label: { en: '"How do you know my name?"', it: '"Come sapete il mio nome?"', es: '"¿Cómo sabéis mi nombre?"' }, nextNodeId: 'step2' },
              { id: 'twins_1_wrong1', label: { en: '"Do we know each other?"', it: '"Ci conosciamo?"', es: '"¿Nos conocemos?"' }, nextNodeId: 'fail' },
              { id: 'twins_1_wrong2', label: { en: '"I am not Samuel."', it: '"Non sono Samuel."', es: '"No soy Samuel."' }, nextNodeId: 'fail' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          step2: {
            id: 'step2',
            text: {
              en: '"You were the one who told us: \'Stay here, I’ll come back for you\'."',
              it: '"Sei stato tu a dirci: \'Restate qui, tornerò a prendervi\'."',
              es: '"Fuiste tú quien nos dijo: \'Quédense aquí, volveré por ustedes\'."'
            },
            choices: [
              { id: 'twins_2_correct', label: { en: '"I don\'t remember any promise."', it: '"Non ricordo alcuna promessa."', es: '"No recuerdo ninguna promesa."' }, nextNodeId: 'step3' },
              { id: 'twins_2_wrong1', label: { en: '"I am back."', it: '"Sono tornato."', es: '"He vuelto."' }, nextNodeId: 'fail' },
              { id: 'twins_2_wrong2', label: { en: '"I lost my memory."', it: '"Ho perso la memoria."', es: '"Perdí la memoria."' }, nextNodeId: 'fail' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          step3: {
            id: 'step3',
            text: {
              en: '"The silence of this hallway is just a held-back scream."',
              it: '"Il silenzio di questo corridoio è solo un urlo trattenuto."',
              es: '"El silencio de este pasillo es solo un grito contenido."'
            },
            choices: [
              { id: 'twins_3_correct', label: { en: '"Come with me."', it: '"Venite con me."', es: '"Vengan conmigo."' }, nextNodeId: 'step4' },
              { id: 'twins_3_wrong1', label: { en: '"I don\'t agree."', it: '"Non sono d\'accordo."', es: '"No estoy de acuerdo."' }, nextNodeId: 'fail' },
              { id: 'twins_3_wrong2', label: { en: '"I prefer the noise of the city."', it: '"Preferisco il rumore della città."', es: '"Prefiero el ruido de la ciudad."' }, nextNodeId: 'fail' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          step4: {
            id: 'step4',
            text: {
              en: '"We can\'t. Everyone in here has a weight, Samuel. The Concierge is the limit. Break the illusion."',
              it: '"Non possiamo. Tutti qui hanno un peso, Samuel. Il Portiere è il limite. Rompi l\'illusione."',
              es: '"No podemos. Todos aquí tienen un peso, Samuel. El Conserje es el límite. Rompe la ilusión."'
            },
            choices: [
              { id: 'twins_4_correct', label: { en: '"I\'ll look around."', it: '"Mi guarderò intorno."', es: '"Miraré a mi alrededor."' }, nextNodeId: 'step5' },
              { id: 'twins_4_wrong1', label: { en: '"I\'ll talk to the Concierge."', it: '"Parlerò con il Portiere."', es: '"Hablaré con el Conserje."' }, nextNodeId: 'fail' },
              { id: 'twins_4_wrong2', label: { en: '"I just want to remember."', it: '"Voglio solo ricordare."', es: '"Solo quiero recordar."' }, nextNodeId: 'fail' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          step5: {
            id: 'step5',
            text: {
              en: '"Time cannot hurt you. Take this, a spark will illuminate the process."',
              it: '"Il tempo non può ferirti. Prendi questo, una scintilla illuminerà il processo."',
              es: '"El tiempo no puede herirte. Toma esto, una chispa iluminará el proceso."'
            },
            choices: [
              { id: 'twins_5_correct', label: { en: '"I\'ll come back for you."', it: '"Tornerò a prendervi."', es: '"Volveré por ustedes."' }, nextNodeId: 'reward' },
              { id: 'twins_5_wrong1', label: { en: '"Thank you."', it: '"Grazie."', es: '"Gracias."' }, nextNodeId: 'fail' },
              { id: 'twins_5_wrong2', label: { en: '"I am not guilty of anything."', it: '"Non sono colpevole di nulla."', es: '"No soy culpable de nada."' }, nextNodeId: 'fail' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          reward: {
            id: 'reward',
            text: {
              en: '"Take it. Complete the circuit."',
              it: '"Prendila. Completa il circuito."',
              es: '"Tómala. Completa el circuito."'
            },
            choices: [
              { id: 'take_fuse', label: { en: 'Take Electric Fuse', it: 'Prendi il Fusibile Elettrico', es: 'Tomar Fusible Eléctrico' }, givesItem: 'Electric Fuse', endsDialogue: true }
            ]
          },
          fail: {
            id: 'fail',
            text: {
              en: '"The twins shake their heads in sync: \'You are slipping into the dark again, Samuel\'."',
              it: '"Le gemelle scuotono la testa all\'unisono: \'Stai scivolando di nuovo nel buio, Samuel\'."',
              es: '"Las gemelas niegan con la cabeza al unísono: \'Te estás deslizando de nuevo en la oscuridad, Samuel\'."'
            },
            choices: [
              { id: 'restart', label: { en: 'Try again', it: 'Riprova', es: 'Intentar de nuevo' }, nextNodeId: 'start' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          completed: {
            id: 'completed',
            text: {
              en: '"We are waiting for you, Samuel. Do not forget the promise."',
              it: '"Ti stiamo aspettando, Samuel. Non dimenticare la promessa."',
              es: '"Te estamos esperando, Samuel. No olvides la promesa."'
            },
            choices: [
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          }
        }
      }
    ],
    actions: [
      { id: 'go_hall', label: { en: 'Return to Hall', it: 'Torna al Salone', es: 'Volver al Salón' }, targetRoom: 'hall' },
      { id: 'go_room404', label: { en: 'Enter Room 404', it: 'Entra nella Stanza 404', es: 'Entrar en la Habitación 404' }, targetRoom: 'room404' },
      { id: 'go_room202', label: { en: 'Enter Room 202', it: 'Entra nella Stanza 202', es: 'Entrar en la Habitación 202' }, targetRoom: 'room202' },
      { id: 'go_suite500', label: { en: 'Enter Suite 500', it: 'Entra nella Suite 500', es: 'Entrar en la Suite 500' }, targetRoom: 'suite500' }
    ]
  },
  kitchen: {
    id: 'kitchen',
    title: { en: 'Industrial Kitchen', it: 'Cucina Industriale', es: 'Cocina Industrial' },
    description: {
      en: 'The air is thick with steam. A massive robot with four arms is busy at the stove.',
      it: 'L\'aria è densa di vapore. Un enorme robot con quattro braccia è impegnato ai fornelli.',
      es: 'El aire está cargado de vapor. Un robot enorme con cuatro brazos está ocupado en los fogones.'
    },
    ambientAudio: 'grand_lounge_social_process.mp3',
    npcs: [
      {
        id: 'chef',
        name: { en: 'The Chef', it: 'Lo Chef', es: 'El Chef' },
        initialNodeId: 'start',
        dialogueNodes: {
          start: {
            id: 'start',
            text: {
              en: '"CAN I HELP YOU, GUEST? I HAVE MANY TASKS TO COMPLETE."',
              it: '"POSSO AIUTARLA, OSPITE? HO MOLTI COMPITI DA COMPLETARE."',
              es: '"¿PUEDO AYUDARLE, HUÉSPED? TENGO MUCHAS TAREAS QUE COMPLETAR."'
            },
            choices: [
              { id: 'chef_ask_tea', label: { en: 'I need tea for the lady.', it: 'Ho bisogno di tè per la signora.', es: 'Necesito té para la señora.' }, nextNodeId: 'step1' },
              { id: 'end', label: { en: 'Just looking', it: 'Sto solo guardando', es: 'Solo estoy mirando' }, endsDialogue: true }
            ]
          },
          step1: {
            id: 'step1',
            text: {
              en: '"We do not serve metaphysical concepts here!"',
              it: '"Non serviamo concetti metafisici qui!"',
              es: '"¡No servimos conceptos metafísicos aquí!"'
            },
            choices: [
              { id: 'chef_warned', label: { en: '"The barman warned me."', it: '"Il barista mi aveva avvertito."', es: '"El barman me había advertido."' }, nextNodeId: 'step2' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          step2: {
            id: 'step2',
            text: {
              en: '"You move through my kitchen like a bug. If you do not know what you are, I will grind you up with the leftovers."',
              it: '"Ti muovi nella mia cucina come un bug. Se non sai cosa sei, ti trito insieme agli avanzi."',
              es: '"Te mueves por mi cocina como un error. Si no sabes lo que eres, te trituraré junto con las sobras."'
            },
            choices: [
              { id: 'chef_test', label: { en: '"Put me to the test."', it: '"Mettimi alla prova."', es: '"Ponme a prueba."' }, nextNodeId: 'final_question' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          final_question: {
            id: 'final_question',
            text: {
              en: '"A parasite of logic. You occupy the space of a truth without having its substance. A noise that disturbs the dinner of the righteous. Who are you?"',
              it: '"Un parassita della logica. Occupi lo spazio di una verità senza averne la sostanza. Un rumore che disturba la cena dei giusti. Chi sei?"',
              es: '"Un parásito de la lógica. Ocupas el espacio de una verdad sin tener su sustancia. Un ruido que perturba la cena de los justos. ¿Quién eres?"'
            },
            choices: [
              { id: 'chef_correct', label: { en: '"A system error."', it: '"Un errore di sistema."', es: '"Un error de sistema."' }, nextNodeId: 'correct_ending' },
              { id: 'chef_fail_temporal', label: { en: '"A temporal anomaly."', it: '"Un\'anomalia temporale."', es: '"Una anomalía temporal."' }, nextNodeId: 'fail_temporal' },
              { id: 'chef_fail_past', label: { en: '"A shadow of the past."', it: '"Un\'ombra del passato."', es: '"Una sombra del pasado."' }, nextNodeId: 'fail_past' }
            ]
          },
          correct_ending: {
            id: 'correct_ending',
            text: {
              en: '"Exactly. An omission that has learned to walk. Take this tea and take your void far from my kitchen. Now vanish, 404."',
              it: '"Esatto. Un\'omissione che ha imparato a camminare. Prendi questo tè e porta il tuo vuoto lontano dalla mia cucina. Ora sparisci, 404."',
              es: '"Exacto. Una omisión que ha aprendido a caminar. Toma este té y lleva tu vacío lejos de mi cocina. Ahora desaparece, 404."'
            },
            choices: [
              { id: 'take_tea', label: { en: 'Take Tea', it: 'Prendi il Tè', es: 'Tomar Té' }, givesItem: 'Elegant Tea', endsDialogue: true }
            ]
          },
          fail_temporal: {
            id: 'fail_temporal',
            text: {
              en: '"Hours do not exist here, only efficiency exists! You are just misplaced trash. OUT!"',
              it: '"Le ore non esistono qui, esiste solo l\'efficienza! Sei solo spazzatura fuori posto. FUORI!"',
              es: '"¡Las horas no existen aquí, solo existe la eficiencia! Solo eres basura fuera de lugar. ¡FUERA!"'
            },
            choices: [
              { id: 'restart', label: { en: 'Try again', it: 'Riprova', es: 'Intentar de nuevo' }, nextNodeId: 'start' }
            ]
          },
          fail_past: {
            id: 'fail_past',
            text: {
              en: '"I told you we don\'t serve metaphysics! Shadows don\'t occupy space, you do! COMPILATION ERROR!"',
              it: '"Ti ho detto che non serviamo metafisica! Le ombre non occupano spazio, tu sì! ERRORE DI COMPILAZIONE!"',
              es: '"¡Te dije que no servimos metafísica! ¡Las sombras no ocupan espacio, tú sí! ¡ERROR DE COMPILACIÓN!"'
            },
            choices: [
              { id: 'restart', label: { en: 'Try again', it: 'Riprova', es: 'Intentar de nuevo' }, nextNodeId: 'start' }
            ]
          }
        }
      }
    ],
    actions: [
      { id: 'go_hall', label: { en: 'Return to Hall', it: 'Torna al Salone', es: 'Volver al Salón' }, targetRoom: 'hall' }
    ]
  },
  room202: {
    id: 'room202',
    title: { en: 'Room 202', it: 'Stanza 202', es: 'Habitación 202' },
    description: {
      en: 'The air smells of ozone. A man sits on the edge of the bed, his hands shaking.',
      it: 'L\'aria odora di ozono. Un uomo siede sul bordo del letto, le mani tremano.',
      es: 'El aire huele a ozono. Un hombre se sienta al borde de la cama, le tiemblan las manos.'
    },
    ambientAudio: 'hallway_loop_404.mp3',
    npcs: [
      {
        id: 'nervous_man',
        name: { en: 'The Engineer', it: 'L\'Ingegnere', es: 'El Ingeniero' },
        initialNodeId: 'start',
        dialogueNodes: {
          start: {
            id: 'start',
            text: {
              en: '"You shouldn\'t be here. I\'ve been waiting for you."',
              it: '"Non dovresti essere qui. Ti stavo aspettando."',
              es: '"No deberías estar aquí. Te he estado esperando."'
            },
            choices: [
              { id: 'choice_reallocate', label: { en: '"I am here to be reallocated."', it: '"Sono qui per essere riallocato."', es: '"Estoy aquí para ser reubicado."' }, nextNodeId: 'step2' },
              { id: 'engineer_1_wrong1', label: { en: '"Your hands are shaking."', it: '"Le tue mani tremano."', es: '"Tus manos están temblando."' }, nextNodeId: 'fail' },
              { id: 'engineer_1_wrong2', label: { en: '"Should I be worried?"', it: '"Dovrei preoccuparmi?"', es: '"¿Debería preocuparme?"' }, nextNodeId: 'fail' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          step2: {
            id: 'step2',
            text: {
              en: '"It’s useless; the process is already underway."',
              it: '"È inutile; il processo è già in corso."',
              es: '"Es inútil; el proceso ya está en marcha."'
            },
            choices: [
              { id: 'engineer_2_correct', label: { en: '"What process are you talking about?"', it: '"Di quale processo stai parlando?"', es: '"¿De qué proceso estás hablando?"' }, nextNodeId: 'step3' },
              { id: 'engineer_2_wrong1', label: { en: '"I’ll find a solution."', it: '"Troverò una soluzione."', es: '"Encontraré una solución."' }, nextNodeId: 'fail' },
              { id: 'engineer_2_wrong2', label: { en: '"Do you know who I am?"', it: '"Sai chi sono?"', es: '"¿Sabes quién soy?"' }, nextNodeId: 'fail' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          step3: {
            id: 'step3',
            text: {
              en: '"We’ve tried this so many times, but the result never changes. You keep coming back."',
              it: '"Ci abbiamo provato così tante volte, ma il risultato non cambia mai. Continui a tornare."',
              es: '"Lo hemos intentado tantas veces, pero el resultado nunca cambia. Sigues volviendo."'
            },
            choices: [
              { id: 'engineer_3_correct', label: { en: '"I could get used to it."', it: '"Potrei abituarmici."', es: '"Podría acostumbrarme a ello."' }, nextNodeId: 'step4' },
              { id: 'engineer_3_wrong1', label: { en: '"How many times have we met already?"', it: '"Quante volte ci siamo già incontrati?"', es: '"¿Cuántas veces nos hemos visto ya?"' }, nextNodeId: 'fail' },
              { id: 'engineer_3_wrong2', label: { en: '"Why shouldn\'t I return?"', it: '"Perché non dovrei tornare?"', es: '"¿Por qué no debería volver?"' }, nextNodeId: 'fail' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          step4: {
            id: 'step4',
            text: {
              en: '"Do you hear that hum in the walls, Samuel? The Structure is trembling..."',
              it: '"Lo senti quel ronzio nei muri, Samuel? La Struttura sta tremando..."',
              es: '"¿Oyes ese zumbido en las paredes, Samuel? La Estructura está temblando..." '
            },
            choices: [
              { id: 'engineer_4_correct', label: { en: '"I hear nothing."', it: '"Non sento nulla."', es: '"No oigo nada."' }, nextNodeId: 'step5' },
              { id: 'engineer_4_wrong1', label: { en: '"You need to calm down."', it: '"Devi calmarti."', es: '"Necesitas calmarte."' }, nextNodeId: 'fail' },
              { id: 'engineer_4_wrong2', label: { en: '"What do you think will happen?"', it: '"Cosa pensi che succederà?"', es: '"¿Qué crees que pasará?"' }, nextNodeId: 'fail' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          step5: {
            id: 'step5',
            text: {
              en: '"The architecture will collapse into the void. This place will cease to exist, and I will become obsolete. Take this badge; I don\'t need it anymore."',
              it: '"L\'architettura crollerà nel vuoto. Questo posto cesserà di esistere, e io diventerò obsoleto. Prendi questo distintivo; non ne ho più bisogno."',
              es: '"La arquitectura colapsará en el vacío. Este lugar dejará de existir y yo quedaré obsoleto. Toma esta insignia; ya no la necesito."'
            },
            choices: [
              { id: 'take_badge', label: { en: 'Take Badge', it: 'Prendi il Distintivo', es: 'Tomar Insignia' }, givesItem: 'Engineering Badge', endsDialogue: true },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          fail: {
            id: 'fail',
            text: {
              en: '"The Engineer\'s eyes flicker with static: \'The sequence is wrong... start over\'."',
              it: '"Gli occhi dell\'Ingegnere lampeggiano di elettricità statica: \'La sequenza è sbagliata... ricomincia\'."',
              es: '"Los ojos del Ingeniero parpadean con estática: \'La secuencia es incorrecta... empieza de nuevo\'."'
            },
            choices: [
              { id: 'restart', label: { en: 'Try again', it: 'Riprova', es: 'Intentar de nuevo' }, nextNodeId: 'start' },
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          },
          completed: {
            id: 'completed',
            text: {
              en: '"Wait for the silence, Samuel. It\'s coming."',
              it: '"Aspetta il silenzio, Samuel. Sta arrivando."',
              es: '"Espera el silencio, Samuel. Ya viene."'
            },
            choices: [
              { id: 'exit', label: { en: 'EXIT', it: 'ESCI', es: 'SALIR' }, endsDialogue: true }
            ]
          }
        }
      }
    ],
    actions: [
      { id: 'go_corridor', label: { en: 'Exit to Corridor', it: 'Esci nel Corridoio', es: 'Salir al Pasillo' }, targetRoom: 'corridor' }
    ]
  },
  suite500: {
    id: 'suite500',
    title: { en: 'Royal Suite 500', it: 'Suite Reale 500', es: 'Suite Real 500' },
    description: {
      en: 'The most luxurious room in the hotel. A heavy mahogany desk sits by the window.',
      it: 'La stanza più lussuosa dell\'hotel. Una pesante scrivania di mogano siede vicino alla finestra.',
      es: 'La habitación más lujosa del hotel. Un pesado escritorio de caoba se encuentra junto a la ventana.'
    },
    ambientAudio: 'hallway_loop_404.mp3',
    actions: [
      { id: 'inspect_desk', label: { en: 'Inspect Desk', it: 'Ispeziona Scrivania', es: 'Inspeccionar Escritorio' } },
      { id: 'go_corridor', label: { en: 'Return to Corridor', it: 'Torna al Corridoio', es: 'Volver al Pasillo' }, targetRoom: 'corridor' }
    ]
  },
  basement: {
    id: 'basement',
    title: { en: 'The Basement', it: 'Il Seminterrato', es: 'El Sótano' },
    description: {
      en: 'A cold, concrete room filled with humming servers. A locked maintenance panel sits near the terminal.',
      it: 'Una stanza fredda di cemento piena di server ronzanti. Un pannello di manutenzione chiuso siede vicino al terminale.',
      es: 'Una habitación fría de hormigón llena de servidores zumbantes. Un panel de mantenimiento cerrado se encuentra cerca de la terminal.'
    },
    ambientAudio: 'basement_the_kernel.mp3',
    npcs: [
      {
        id: 'maintenance_man',
        name: { en: 'Maintenance Man', it: 'Manutentore', es: 'Mantenimiento' },
        initialNodeId: 'start',
        dialogueNodes: {
          start: {
            id: 'start',
            text: {
              en: '"I can\'t move. I\'m waiting for the \'Reality Update\' signal for the Kitchen. My instructions are absolute."',
              it: '"Non posso muovermi. Sto aspettando il segnale di \'Aggiornamento Realtà\' per la Cucina. Le mie istruzioni sono assolute."',
              es: '"No puedo moverme. Estoy esperando la señal de \'Actualización de Realidad\' para la Cocina. Mis instrucciones son absolutas."'
            },
            choices: [
              { id: 'man_step1_wrong', label: { en: '"The Chef said it\'s already done."', it: '"Lo Chef ha detto che è già fatto."', es: '"El Chef dijo que ya está hecho."' }, nextNodeId: 'fail_reset' },
              { id: 'man_step1_correct', label: { en: '"The new priority is Suite 500."', it: '"La nuova priorità è la Suite 500."', es: '"La nueva prioridad es la Suite 500."' }, nextNodeId: 'step2' },
              { id: 'end', label: { en: 'Never mind', it: 'Lascia stare', es: 'No importa' }, endsDialogue: true }
            ]
          },
          step2: {
            id: 'step2',
            text: {
              en: '"Suite 500? That sector is blocked by the Maid."',
              it: '"Suite 500? Quel settore è bloccato dalla Cameriera."',
              es: '"¿Suite 500? Ese sector está bloqueado por la Camarera."'
            },
            choices: [
              { id: 'man_step2_correct', label: { en: '"The Maid has undergone a reallocation."', it: '"La Cameriera ha subito un riallocamento."', es: '"La Camarera ha pasado por una reasignación."' }, requiredItem: 'Engineering Badge', nextNodeId: 'step3' },
              { id: 'man_step2_wrong', label: { en: '"I\'ll find the clearance for you."', it: '"Troverò l\'autorizzazione per te."', es: '"Encontraré la autorización para ti."' }, nextNodeId: 'fail_reset' }
            ]
          },
          step3: {
            id: 'step3',
            text: {
              en: '"My presence becomes essential. Should I terminate my current task?"',
              it: '"La mia presenza diventa essenziale. Dovrei terminare il mio compito attuale?"',
              es: '"Mi presencia se vuelve esencial. ¿Debo terminar mi tarea actual?"'
            },
            choices: [
              { id: 'man_step3_correct', label: { en: '"Execute priority."', it: '"Esegui priorità."', es: '"Ejecutar prioridad."' }, endsDialogue: true },
              { id: 'man_step3_wrong', label: { en: '"Yes, go take a break."', it: '"Sì, vai a fare una pausa."', es: '"Sí, ve a tomar un descanso."' }, nextNodeId: 'fail_reset' }
            ]
          },
          fail_reset: {
            id: 'fail_reset',
            text: {
              en: '"Instructions absolute. Desynchronization detected. Resetting dialogue protocol."',
              it: '"Istruzioni assolute. Desincronizzazione rilevata. Reset del protocollo di dialogo."',
              es: '"Instrucciones absolutas. Desincronización detectada. Reiniciando protocolo de diálogo."'
            },
            choices: [{ id: 'restart', label: { en: 'Try again', it: 'Riprova', es: 'Intentar de nuevo' }, nextNodeId: 'start' }]
          }
        }
      },
      {
        id: 'terminal',
        name: { en: 'Terminal', it: 'Terminale', es: 'Terminal' },
        initialNodeId: 'start',
        dialogueNodes: {
          start: {
            id: 'start',
            text: {
              en: 'ENTER ACCESS CODE:',
              it: 'INSERIRE CODICE DI ACCESSO:',
              es: 'INGRESAR CÓDIGO DE ACCESO:'
            },
            choices: [
              { id: 'terminal_code_1', label: { en: '0000', it: '0000', es: '0000' } },
              { id: 'terminal_code_2', label: { en: '8888', it: '8888', es: '8888' } },
              { id: 'terminal_code_3', label: { en: '9999', it: '9999', es: '9999' } },
              { id: 'cancel', label: { en: 'Cancel', it: 'Annulla', es: 'Cancelar' }, endsDialogue: true }
            ]
          },
          success: {
            id: 'success',
            text: {
              en: 'SYSTEM OVERRIDE: BACKDOOR OPEN. LOGGING OUT...',
              it: 'OVERRIDE DI SISTEMA: BACKDOOR APERTO. DISCONNESSIONE...',
              es: 'ANULACIÓN DEL SISTEMA: PUERTA TRASERA ABIERTA. CERRANDO SESIÓN...'
            },
            choices: [
              { id: 'end', label: { en: 'Close', it: 'Chiudi', es: 'Cerrar' }, endsDialogue: true }
            ]
          },
          fail: {
            id: 'fail',
            text: {
              en: 'INVALID CODE. ACCESS DENIED.',
              it: 'CODICE NON VALIDO. ACCESSO NEGATO.',
              es: 'CÓDIGO INVÁLIDO. ACCESO DENEGADO.'
            },
            choices: [
              { id: 'retry', label: { en: 'Retry', it: 'Riprova', es: 'Reintentar' }, nextNodeId: 'start' },
              { id: 'end', label: { en: 'Exit', it: 'Esci', es: 'Salir' }, endsDialogue: true }
            ]
          }
        }
      }
    ],
    actions: [
      { id: 'open_panel', label: { en: 'Open Maintenance Panel', it: 'Apri Pannello di Manutenzione', es: 'Abrir Panel de Mantenimiento' } },
      { id: 'insert_fuse', label: { en: 'Insert Electric Fuse', it: 'Inserisci Fusibile Elettrico', es: 'Insertar Fusible Eléctrico' } },
      { id: 'enter_code', label: { en: 'Enter Access Code', it: 'Inserisci Codice di Accesso', es: 'Ingresar Código de Acceso' } },
      { id: 'go_hall', label: { en: 'Return to Hall', it: 'Torna al Salone', es: 'Volver al Salón' }, targetRoom: 'hall' }
    ]
  },
  white: {
    id: 'white',
    title: { en: 'The White Room', it: 'La Stanza Bianca', es: 'La Habitación Blanca' },
    description: {
      en: 'Pure, blinding light. No walls, no floor. Only the console remains.',
      it: 'Luce pura e accecante. Niente pareti, niente pavimento. Rimane solo la console.',
      es: 'Luz pura y cegadora. Sin paredes, sin suelo. Solo queda la consola.'
    },
    ambientAudio: 'white_room_final_crash.mp3',
    npcs: [
      {
        id: 'white_terminal',
        name: { en: 'System Console', it: 'Console di Sistema', es: 'Consola del Sistema' },
        initialNodeId: 'uninformed',
        dialogueNodes: {
          uninformed: {
            id: 'uninformed',
            text: { 
              en: 'SYSTEM TERMINATION REQUESTED. ENTER CHECKSUM:', 
              it: 'TERMINAZIONE SISTEMA RICHIESTA. INSERIRE CHECKSUM:', 
              es: 'TERMINACIÓN DEL SISTEMA SOLICITADA. INGRESAR CHECKSUM:' 
            },
            choices: [
              { id: 'wrong_1', label: { en: '11110000', it: '11110000', es: '11110000' }, nextNodeId: 'error' },
              { id: 'wrong_2', label: { en: '00001111', it: '00001111', es: '00001111' }, nextNodeId: 'error' },
              { id: 'wrong_3', label: { en: '10101010', it: '10101010', es: '10101010' }, nextNodeId: 'error' },
              { id: 'wrong_4', label: { en: '01010101', it: '01010101', es: '01010101' }, nextNodeId: 'error' },
            ]
          },
          informed: {
            id: 'informed',
            text: { 
              en: 'SYSTEM TERMINATION REQUESTED. COMPLETE THE SEQUENCE:', 
              it: 'TERMINAZIONE SISTEMA RICHIESTA. COMPLETA LA SEQUENZA:', 
              es: 'TERMINACIÓN DEL SISTEMA SOLICITADA. COMPLETA LA SECUENCIA:' 
            },
            choices: [
              { id: 'choice_a', label: { en: '....0101 ....1000 ....1001 ....0100', it: '....0101 ....1000 ....1001 ....0100', es: '....0101 ....1000 ....1001 ....0100' }, nextNodeId: 'true_ending' },
              { id: 'choice_b', label: { en: '....1111 ....0000 ....1010 ....0101', it: '....1111 ....0000 ....1010 ....0101', es: '....1111 ....0000 ....1010 ....0101' }, nextNodeId: 'corruption' },
              { id: 'choice_c', label: { en: '....0001 ....0110 ....1100 ....0011', it: '....0001 ....0110 ....1100 ....0011', es: '....0001 ....0110 ....1100 ....0011' }, nextNodeId: 'corruption' },
              { id: 'choice_d', label: { en: '....1010 ....1010 ....1010 ....1010', it: '....1010 ....1010 ....1010 ....1010', es: '....1010 ....1010 ....1010 ....1010' }, nextNodeId: 'corruption' },
            ]
          },
          error: {
            id: 'error',
            text: { 
              en: 'Checksum Error. Sequence mismatch. Resetting...', 
              it: 'Errore Checksum. Sequenza non corrispondente. Reset in corso...', 
              es: 'Error de Checksum. Desajuste de secuencia. Reiniciando...' 
            },
            choices: [{ id: 'reset_uninformed', label: { en: 'RESET', it: 'RESET', es: 'REINICIAR' }, targetRoom: 'room404', endsDialogue: true }]
          },
          corruption: {
            id: 'corruption',
            text: { 
              en: 'Corruption Detected. Resetting...', 
              it: 'Corruzione Rilevata. Reset in corso...', 
              es: 'Corrupción Detectada. Reiniciando...' 
            },
            choices: [{ id: 'reset_informed', label: { en: 'RESET', it: 'RESET', es: 'REINICIAR' }, targetRoom: 'room404', endsDialogue: true }]
          },
          true_ending: {
            id: 'true_ending',
            text: { 
              en: 'Sequence Validated. Word: EXIT. System shutting down. Goodbye, Samuel.', 
              it: 'Sequenza Convalidata. Parola: EXIT. Spegnimento sistema. Addio, Samuel.', 
              es: 'Secuencia Validada. Palabra: EXIT. Apagando sistema. Adiós, Samuel.' 
            },
            choices: [{ id: 'final_end', label: { en: '...', it: '...', es: '...' }, endsDialogue: true }]
          }
        }
      }
    ],
    actions: []
  }
};
