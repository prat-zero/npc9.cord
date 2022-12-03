// imports
import {
  CommandInteraction,
  CacheType,
  ApplicationCommandDataResolvable,
} from "discord.js-light";
import { slash } from "./@slash";

// declare the command class
@slash("github")
class GitHubCommand {
  main(interaction: CommandInteraction<CacheType>) {
    interaction.reply({
      content: "https://github.com/prat-zero/npc9.cord",
      ephemeral: true,
    });
  }
}

// export command data
export const command: ApplicationCommandDataResolvable = {
  name: "github",
  description:
    "Get a link of the GitHub repo, where the primary development takes place",
};
