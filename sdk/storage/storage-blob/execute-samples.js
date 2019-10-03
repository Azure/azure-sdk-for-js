const execa = require("execa");
const fs = require("fs");
require("dotenv").config({ path: "../.env" });

async function getCommand(cwd, fn) {
  let cmd = "";

  fs.readdir(cwd, async function(err, items) {
    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
      const thisSample = "ts-node " + items[i] + " && ";
      cmd = cmd + thisSample;
    }
    cmd = cmd + "echo done";
    console.log(".0 - ", cmd);
    fn(cmd);
  });
}

async function exec(cwd) {
  let cmd = "";
  await getCommand(cwd, function(location) {
    console.log(".3 - " + location); // this is where you get the return value
    cmd = location;
  });
  console.log(".2 - ", cmd);
  let command = execa("ts-node basic.ts", {
    cwd,
    shell: true
  });
  command.stderr.pipe(process.stderr);
  command.stdout.pipe(process.stdout);
  return command;
}

(async () => {
  try {
    console.log("Running typescript samples...");
    await exec("./samples/typescript");
    process.exit(0);
  } catch (error) {
    console.log("Typescript samples failed!");
    console.log(error);
    process.exit(1);
  }
})();
