// imports
import pino from "pino";
import { GatewayIntentBits } from "discord-api-types/v10";
import {
  Client,
  ClientEvents,
  Options,
  CommandInteraction,
  CacheType,
} from "discord.js-light";

// export pino logger
export const logs = pino();

// extend the process variable
declare var process: {
  env: {
    [key: string]: string | number;
    DISCORD_TOKEN: string;
    GUILD: string;
    PROD: string;
  };
};

// export the env
export const env = process.env;

// the maps
export const slashCommands = new Map<
  string,
  (i: CommandInteraction<CacheType>) => void | Promise<void>
>();

// the discord decorator
export function discord(constructor: Function) {
  // invoke class with `new`
  // @ts-expect-error
  new constructor();

  // secure the runtime
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// the main function decorator
export function main() {
  return function (t: any, p: string, d: PropertyDescriptor) {
    d.value();
  };
}

// init the client
export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  makeCache: Options.cacheWithLimits({
    GuildManager: Infinity,
  }),
});

client.token = env.DISCORD_TOKEN;

// the decorator to add an event listener
export function on(event: keyof ClientEvents) {
  return function (t: any, p: string, d: PropertyDescriptor) {
    client.on(event, d.value);
  };
}

// the decorator to add an event listener for once
export function once(event: keyof ClientEvents) {
  return function (t: any, p: string, d: PropertyDescriptor) {
    client.once(event, d.value);
  };
}
