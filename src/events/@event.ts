// imports
import { ClientEvents } from "discord.js-light";
import { client } from "../lib";

// export the event decorator
export function event(event: keyof ClientEvents, once = false) {
  return function (constructor: Function) {
    // @ts-expect-error
    const fn = new constructor().main;

    if (once === false) client.on(event, fn);
    else client.once(event, fn);
  };
}
