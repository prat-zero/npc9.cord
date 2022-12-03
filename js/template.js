// @ts-check
// imports, this is a poorly written script
const fs = require("fs");
const { join } = require("path");
const args = process.argv.slice(2);
const lodash = require("lodash");
const { version } = require("../package.json");

const type = args[0];

// switch casing
switch (type) {
  case "event":
    createEventTemplate(args[1]);
    break;
  case "e":
    createEventTemplate(args[1]);
    break;
  default:
    console.log("Invalid template type");
    process.exit(1);
}

/**
 *
 * @param {string} name
 */
function createEventTemplate(name) {
  if (name === undefined || name === "") {
    console.log(`Invalid event name`);
    return;
  };

  const filepath = join(
    process.cwd(),
    "src",
    "events",
    `${lodash.camelCase(name)}.ts`
  );

  const read = fs.readFileSync(join(process.cwd(), "template", "event.txt"), "utf-8");

  const date = new Date();

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const vars = {
    "<DATE>": year + "-" + month + "-" + day,
    "<VERSION>": version,
    "<CAMELCASE_EVENT>": lodash.camelCase(name),
    "<NORMAL_EVENT>": name,
  };

  const regex = new RegExp(Object.keys(vars).join("|"), "gi");

  fs.writeFileSync(filepath, read.replace(regex, (matched) => {
    return vars[matched];
  }));
}
