const { spawnSync } = require("child_process");
const path = require("path");

function spawn(command) {
  const ret = spawnSync(command, { shell: true, stdio: "inherit" });

  if (ret.status !== 0) {
    throw new Error(`${command} failed with exit code ${ret.status}`);
  }
}

const navigateToPerfStressFolder = `cd ${path.resolve(
  "..",
  "..",
  "..",
  "test-utils",
  "perfstress"
)}`;
const buildPerfStressPackage = `rush build -t test-utils-perfstress`;
const rushxPack = `rushx pack`;

console.log(`\nGetting perfstress package...`);
spawn(`${navigateToPerfStressFolder} && ${buildPerfStressPackage} && ${rushxPack}`);

console.log(`\nRunning "npm install"...`);
spawn(`npm install`);
