const execa = require("execa");
const fs = require("fs");
require("dotenv").config({ path: "../.env" });

// Samples can be skipped by mentioning them in the skipSamples Array.
// Suppose skipSamples = ["some-entry", "sample-2"],
//    some-entry.ts, sample-2.ts, some-entry.js and sample-2.js will be skipped.
const skipSamples = ["proxyAuth"];

const bDel = `!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`;
const del = `${bDel}------------------------------${bDel}`;

// Colours - green, yellow, red and blue - for console logs.
const { g, y, r, b } = [
  ["r", 1],
  ["g", 2],
  ["b", 4],
  ["y", 3]
].reduce(
  (cols, col) => ({
    ...cols,
    [col[0]]: (f) => `\x1b[3${col[1]}m${f}\x1b[0m`
  }),
  {}
);

// Executes `cmd` in `cwd`(directory).
async function exec(cmd, cwd) {
  let command = execa(cmd, {
    cwd,
    shell: true
  });
  command.stderr.pipe(process.stderr);
  command.stdout.pipe(process.stdout);
  return command;
}

async function runSamples(language) {
  let cmd;
  // Tries to execute all the samples in the `directory`.
  const directory = `./samples/${language}`;

  if (language === "typescript") {
    cmd = "ts-node";
  } else {
    cmd = "node";
    // await exec(`npm run build:js-samples`, directory);
  }

  console.log(`Running ${language} samples...`);

  const files = fs.readdirSync(directory);

  for (var i = 0; i < files.length; i++) {
    if (!skipSamples.includes(files[i].split(".")[0])) {
      try {
        console.log(`\n\n${b(del)}\n${del}`);
        console.log(`${bDel}\t${files[i]} \t `);
        console.log(`${del}\n${b(del)} \n`);

        console.log(`${g("Running")} ${y(files[i])} ${g("...")}`);
        // Executing a sample - Example: (`ts-node samplefilename.ts`, `./samples/typescript`).
        await exec(`${cmd} ${files[i]}`, directory);
        console.log(`${g(files[i] + " is done..!")}`);
      } catch (error) {
        console.log(error.shortMessage);
        console.log(`${r(del)}\n${del}`);
        console.log(`${bDel}\t${files[i]} Sample - FAILED\t `);
        console.log(`${del}\n${r(del)}`);
      }
    }
  }
}

(async () => {
  try {
    await runSamples("typescript");
    await runSamples("javascript");
    process.exit(0);
  } catch (error) {
    console.log("Samples failed!");
    console.log(error);
    process.exit(1);
  }
})();
