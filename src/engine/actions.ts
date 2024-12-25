/**
 * actions.ts
 * Action handlers: look, take, drop, etc.
 */

import { GameState, addToInventory, removeFromInventory } from "./game-state";
import { parseCommand } from "./parser";
import messagesData from "../data/messages.json";

const M = messagesData.messages;  // Shorthand

export function handleCommand(gs: GameState, input: string): string {
  const parsed = parseCommand(input);
  if(!parsed.verb) {
    return M.invalidCommand;
  }
  const v = parsed.verb;
  switch(v) {
    case "look":
      return doLook(gs);
    case "go":
    case "north":
    case "south":
    case "east":
    case "west":
    case "up":
    case "down":
      return doGo(gs, v);
    case "inventory":
    case "i":
      return doInventory(gs);
    case "take":
      return doTake(gs, parsed.directObject);
    case "drop":
      return doDrop(gs, parsed.directObject);
    default:
      return "That action isn't implemented yet.";
  }
}

function doLook(gs: GameState): string {
  // For simplicity, just returning a placeholder
  return "Room: " + gs.currentRoom + ". " + M.lookAroundDefault;
}

function doGo(gs: GameState, direction: string): string {
  // In real code, we'd look up the room's exits from data
  // We'll do a placeholder
  return M.cantGoThatWay;
}

function doInventory(gs: GameState): string {
  if(gs.inventory.length === 0) {
    return M.inventoryNothing;
  }
  return M.inventoryPrefix + " " + gs.inventory.join(", ");
}

function doTake(gs: GameState, objId: string | null): string {
  if(!objId) return M.needDirectObject;
  // In real code, check if the object is present in the current room or container
  // We'll do a placeholder
  addToInventory(gs, objId);
  return "Taken.";
}

function doDrop(gs: GameState, objId: string | null): string {
  if(!objId) return M.needDirectObject;
  if(!gs.inventory.includes(objId)) {
    return M.objectNotHere;
  }
  removeFromInventory(gs, objId);
  // Place it in the current room
  gs.objectLocations[objId] = gs.currentRoom;
  return "Dropped.";
}