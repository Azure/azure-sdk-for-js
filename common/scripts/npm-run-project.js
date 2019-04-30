const fs = require("fs");
const process = require("process");
const childProcess = require("child_process");

function read(filename) {
  const txt = fs
    .readFileSync(filename, "utf8")
    .replace(/\r/gm, "")
    .replace(/\n/gm, "«")
    .replace(/\/\*.*?\*\//gm, "")
    .replace(/«/gm, "\n")
    .replace(/\s+\/\/.*/g, "");
  return JSON.parse(txt);
}

const [nodePath, /* Ex: /bin/node */ scriptPath, /* /repo/common/scripts/npm-run-project.js */ projectName, /* myproject */ ...scriptNameAndArgs /* [lint, --fix] */] = process.argv;
if (!nodePath || !scriptPath) {
    throw new Error('Unexpected exception: could not detect node path or script path');
}
if (process.argv.length < 3) {
    console.error('Usage: npm-run-project.js <projectname> <scriptname> [args...]');
    console.error('Example: npm-run-project.js myproject lint --fix');
    process.exit(1);
}

const rush = read(`${__dirname}/../../rush.json`);
let workingDir;
for (const each of rush.projects) {
    if (each.packageName == projectName) {
        workingDir = each.projectFolder;
        break;
    }
}
if (!workingDir) {
    console.error(`Project ${projectName} not found in rush.json`);
    process.exit(1);
}

try {
  const result = childProcess.spawnSync("npm", ["run", ...scriptNameAndArgs], {
    stdio: 'inherit',
    cwd: workingDir,
    env: process.env
  });
  process.exit(result.status)
} catch (e) {
  console.error(`\n\n${e.toString()}\n\n`);
  process.exit(1);
}