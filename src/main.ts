// imports
import "dotenv/config";
import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { client, discord, logs, main, on } from "./lib";

// declare the main class
@discord
class $AppDiscord {
  @on("ready")
  private ready() {
    logs.info("Client logged in");

    const folder = join(__dirname, "events");

    if (existsSync(folder)) {
      readdirSync(folder)
        .filter((file) => file.endsWith(".js") || file.endsWith(".ts"))
        .forEach((file) => {
          if (!file.startsWith("@")) {
            require(join(folder, file));
          }
        });
    }
  }

  @main()
  run() {
    client.login();
  }
}
