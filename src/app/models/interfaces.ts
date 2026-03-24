export type Language = 'en' | 'it' | 'es';

export interface Action {
  id: string;
  label: Record<Language, string>;
  targetRoom?: string;
  requiredItem?: string;
  isSecret?: boolean;
}

export interface DialogueChoice {
  id: string;
  label: Record<Language, string>;
  nextNodeId?: string;
  requiredItem?: string;
  givesItem?: string;
  unlocksRoom?: string;
  targetRoom?: string;
  endsDialogue?: boolean;
}

export interface DialogueNode {
  id: string;
  text: Record<Language, string>;
  choices: DialogueChoice[];
}

export interface NPC {
  id: string;
  name: Record<Language, string>;
  initialNodeId: string;
  dialogueNodes: Record<string, DialogueNode>;
}

export interface Room {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  actions: Action[];
  npcs?: NPC[];
  ambientAudio: string;
}

export interface Item {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
}

export interface GameState {
  language: Language;
  currentRoomId: string;
  inventory: string[]; // IDs of items
  memoryFragments: number;
  unlockedRooms: string[];
  discoveredRooms: string[];
  inspectCounter: number;
  isStarted: boolean;
  isGlitched: boolean;
  isFlashback: boolean;
  isFadingOut: boolean;
  isFadingOutBlack: boolean;
  activeNpcId: string | null;
  activeNodeId: string | null;
  history: string[];
  isMapOpen: boolean;
  twinsDialogueStep: number;
  isPanelOpen: boolean;
  isFuseInserted: boolean;
  isBackdoorActive: boolean;
  hasObservedPainting: boolean;
  isGameOver: boolean;
  isMaintenanceManGone: boolean;
  hasGivenTea: boolean;
  hasBeenToldToReallocate: boolean;
  engineerDialogueStep: number;
  chefDialogueStep: number;
  isKitchenLocked: boolean;
  hasBinaryFragment: boolean;
  isWhiteRoomActive: boolean;
  isWhiteRoomSubMenuOpen: boolean;
  isFinalTranslationShown: boolean;
}
