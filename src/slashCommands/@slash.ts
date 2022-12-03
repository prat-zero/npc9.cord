import { slashCommands } from "../lib";

// the decorator to add a slash command to the map
export function slash(name: string) {
  return function (constructor: Function) {
    // @ts-expect-error
    slashCommands.set(name, new constructor().main);
  };
}
