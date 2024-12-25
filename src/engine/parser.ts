/**
 * parser.ts
 * Splits user commands, finds the verb, object, etc.
 */

interface ParseResult {
  verb: string | null;
  directObject: string | null;
  indirectObject: string | null;
}

const knownVerbs = [
  "look", "take", "drop", "open", "close",
  "go", "north", "south", "east", "west", "up", "down",
  "inventory", "i", "help", "attack", "light", "extinguish",
  "inflate", "deflate", "wave", "dig", "board", "disembark"
  // add synonyms as needed
];

export function parseCommand(input: string): ParseResult {
  const tokens = input.trim().toLowerCase().split(/\s+/);
  if(tokens.length < 1) {
    return { verb: null, directObject: null, indirectObject: null };
  }

  // First word = verb (or direction)
  let verb = tokens[0];
  let directObject: string | null = null;
  let indirectObject: string | null = null;

  if(!knownVerbs.includes(verb)) {
    // Could attempt synonyms or guess
    return { verb: null, directObject: null, indirectObject: null };
  }

  // Example: "take lamp" => verb=take, directObject=lamp
  if(tokens.length >= 2) {
    directObject = tokens[1];
    if(tokens.length >= 4) {
      // e.g. "put coin in slot" => tokens[0]=put, tokens[1]=coin, tokens[2]=in, tokens[3]=slot
      indirectObject = tokens[3];
    }
  }

  return { verb, directObject, indirectObject };
}