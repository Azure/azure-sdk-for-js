const execa = require("execa");
const fs = require("fs");
require("dotenv").config({ path: "../.env" });

const skipSet = ["proxyAuth"];
const delimiter = `!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`;

const { g, y, r, b } = [["r", 1], ["g", 2], ["b", 4], ["y", 3]].reduce(
  (cols, col) => ({
    ...cols,
    [col[0]]: (f) => `\x1b[3${col[1]}m${f}\x1b[0m`
  }),
  {}
);

async function exec(cmd, cwd) {
  let command = execa(cmd, {
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
    for (var i = 0; i < files.length; i++) {
      if (skipSet.includes(files[i].split(".")[0])) {
        continue;
      } else {
        try {
          console.log(`\n\n${b(delimiter)}\n${delimiter}`);
          console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\t${files[i]} \t `);
          console.log(`${delimiter}\n${b(delimiter)} \n`);
          console.log(`${g("Running")} ${y(files[i])} ${g("...")}`);
          await exec(`ts-node ${files[i]}`, "./samples/typescript");
          console.log(`${g(files[i] + " is done..!")}`);
        } catch (error) {
          console.log(error.message);
          console.log(`${r(delimiter)}\n${delimiter}`);
          console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\t${files[i]} Sample - FAILED\t `);
          console.log(`${delimiter}\n${r(delimiter)}`);
        }
      }
    }
    console.log("Running typescript samples...");
    process.exit(0);
  } catch (error) {
    console.log("Typescript samples failed!");
    console.log(error);
    process.exit(1);
  }
})();
