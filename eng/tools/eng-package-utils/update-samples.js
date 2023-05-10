const path = require("path");
const process = require("process");
const { spawnSync } = require("child_process");
const { getRushSpec } = require("./index");
const fs = require("fs");


const parseArgs = () => {
  if (process.argv.some((a) => ["-h", "--help"].includes(a.toLowerCase())) || process.argv.length < 3) {
    console.error("Usage: node update-samples.js <artifact-name>");
    console.error("Example: node update-samples.js azure-storage-blob");
  }

  const [scriptPath, artifactName] = process.argv.slice(1);
  const baseDir = path.resolve(`${path.dirname(scriptPath)}/../../..`);
  return [baseDir, artifactName];
};


const spawnNode = (cwd, ...args) => {
  console.log(`Executing: "dev-tool ${args.join(" ")}" in ${cwd}\n\n`);
  const proc = spawnSync("dev-tool", args, { cwd, shell: true, stdio: "inherit" });
  console.log(`\n\process exited with code ${proc.status}`);
  if (proc.status !== 0) {
    process.exitCode = proc.status || 1;
  }
  return proc.status
};

async function main(repoRoot, artifactName) {
  var rushSpec = await getRushSpec(repoRoot);
  //Find project root directory using information in rush.json
  const targetPackage = rushSpec.projects.find(
    (packageSpec) => packageSpec.packageName.replace("@", "").replace("/", "-") == artifactName
  );

  if (!targetPackage) {
    console.log(`Package is not found in rush.json for artifact ${artifactName}`);
    return;
  }

  if (targetPackage.versionPolicyName == "management") {
    console.log(`Skipping update samples for management package ${artifactName}`);
    return;
  }

  const samplesDevPath = path.join(targetPackage.projectFolder, "samples-dev");
  if (!fs.existsSync(samplesDevPath)) {
    console.log(`Samples-dev directory is not present in ${targetPackage.projectFolder}. Skipping udpate samples.`);
    return;
  }

  console.log(`Running samples update for package ${targetPackage.packageName}`);
  spawnNode(targetPackage.projectFolder, "samples publish --force");
};

const [repoRoot, artifactName] = parseArgs();
main(repoRoot, artifactName);
