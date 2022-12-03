// imports
import { Interaction, CacheType } from "discord.js-light";
import { existsSync, readdirSync } from "fs";
import { resolve } from "path";
import { client, env, logs, slashCommands } from "../lib";
import { event } from "./@event";

// declare the class
@event("interactionCreate")
class $InteractionCreate {
  async main(interaction: Interaction<CacheType>) {
    if (interaction.isCommand()) {
      if (interaction.command?.type === "CHAT_INPUT") {
        const fn = slashCommands.get(interaction.commandName);
        fn ? await fn(interaction) : undefined;
      }
    }
  }

  constructor() {
    logs.info(`Loaded class ${$InteractionCreate.name}`);

    const slashCommandsFolder = resolve(__dirname, "..", "slashCommands");

    if (existsSync(slashCommandsFolder)) {
      readdirSync(slashCommandsFolder)
        .filter((file) => file.endsWith(".js") || file.endsWith(".ts"))
        .forEach((file) => {
          if (!file.startsWith("@")) {
            const mod = require(resolve(slashCommandsFolder, file));

            if (mod.command) {
              if (mod.global === true || env.PROD === "T") {
                client.application?.commands.create(mod.command);
              } else {
                client.guilds.cache
                  .get(env.GUILD)
                  ?.commands.create(mod.command);
              }
            }
          }
        });
    }
  }
}
