const execa = require("execa");
const fs = require("fs");
require("dotenv").config({ path: "../.env" });

const skipSet = ["proxyAuth"];
const delimiter = `!!!!!!!!!!!---------------------!!!!!!!!!!!!!`;

const { g, y } = [["g", 2], ["y", 3]].reduce(
  (cols, col) => ({
    ...cols,
    [col[0]]: (f) => `\x1b[3${col[1]}m${f}\x1b[0m`
  }),
  {}
);

async function exec(cmd, cwd) {
  let command = execa(cmd + " echo done", {
    cwd,
    shell: true
  });
  command.stderr.pipe(process.stderr);
  command.stdout.pipe(process.stdout);
  return command;
}

(async () => {
  try {
    var files = fs.readdirSync("./samples/typescript");
    console.log(files);
    let cmd = "";
    for (var i = 0; i < files.length; i++) {
      console.log(files[i]);
      if (skipSet.includes(files[i].split(".")[0])) {
        continue;
      } else {
        const thisSample =
          `echo ${delimiter} && echo ${g("Running")} ${y(files[i])} ${g("...")} && ts-node ` +
          files[i] +
          ` && echo ${g(files[i] + " is done..!")} && echo ${delimiter} &&`;
        cmd = cmd + thisSample;
      }
    }
    console.log("#1 - ", cmd);
    console.log("Running typescript samples...");
    await exec(cmd, "./samples/typescript");
    process.exit(0);
  } catch (error) {
    console.log("Typescript samples failed!");
    console.log(error);
    process.exit(1);
  }
})();
