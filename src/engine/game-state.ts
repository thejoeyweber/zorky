/**
 * game-state.ts
 * Tracks the player's location, inventory, puzzle flags, etc.
 */

export interface GameObjectLocation {
  [objectId: string]: string | null; 
  // e.g. object "COAL" => "MAZE1" or "INVENTORY" or null if destroyed
}

export interface PuzzleFlags {
  [flagName: string]: boolean | number;
}

export interface GameState {
  currentRoom: string;
  objectLocations: GameObjectLocation;
  puzzleFlags: PuzzleFlags;
  inventory: string[];
  score: number;
  moves: number;
  // add more if needed
}

export function createInitialGameState(): GameState {
  return {
    currentRoom: "WHOUS",  // Start west of house
    objectLocations: {},
    puzzleFlags: {},
    inventory: [],
    score: 0,
    moves: 0
  };
}

export function setFlag(gs: GameState, flagName: string, value: boolean | number) {
  gs.puzzleFlags[flagName] = value;
}

export function getFlag(gs: GameState, flagName: string): boolean | number | undefined {
  return gs.puzzleFlags[flagName];
}

export function moveObject(gs: GameState, objId: string, newLoc: string | null) {
  gs.objectLocations[objId] = newLoc;
}

export function hasObject(gs: GameState, objId: string): boolean {
  return gs.inventory.includes(objId);
}

export function addToInventory(gs: GameState, objId: string) {
  if(!gs.inventory.includes(objId)) {
    gs.inventory.push(objId);
  }
  gs.objectLocations[objId] = "INVENTORY";
}

export function removeFromInventory(gs: GameState, objId: string) {
  gs.inventory = gs.inventory.filter(id => id !== objId);
}