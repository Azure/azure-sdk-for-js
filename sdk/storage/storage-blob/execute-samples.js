const execa = require("execa");
const fs = require("fs");
require("dotenv").config({ path: "../.env" });

async function exec(cwd, cmd) {
  fs.readdir(cwd, function(err, items) {
    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
    }
  });
  const command = execa(cmd, { cwd, shell: true });
  command.stderr.pipe(process.stderr);
  command.stdout.pipe(process.stdout);
  return command;
}

(async () => {
  try {
    console.log("Running typescript samples...");
    await exec("./samples/typescript", `ts-node basic.ts`);
    process.exit(0);
  } catch (error) {
    console.log("Typescript test failed!");
    console.log(error);
    process.exit(1);
  }
})();
