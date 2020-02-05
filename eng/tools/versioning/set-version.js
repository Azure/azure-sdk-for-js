let argv = require("yargs")
  .options({
    "artifact-name": {
      type: "string",
      describe:
        "name of the artifact to be set (e.g. azure-keyvault-secrets), will be translated to @azure/(package) format",
      demandOption: true
    },
    "new-version": {
      type: "string",
      describe: "package version string",
      demandOption: true
    },
    "repo-root": {
      type: "string",
      default: "../../../",
      describe: "root of the repository (e.g. ../../../)",
      demandOption: true
    },
    "dry-run": {
      type: "boolean"
    }
  })
  .help().argv;

const path = require("path");
const versionUtils = require("./VersionUtils");
var spawn = require("child_process").spawn, child;
async function main(argv) {
  const artifactName = argv["artifact-name"];
  const newVersion = argv["new-version"];
  const repoRoot = argv["repo-root"];
  const dryRun = argv["dry-run"];

  const packageName = artifactName.replace("azure-", "@azure/");
  const rushSpec = await versionUtils.getRushSpec(repoRoot);

  const targetPackage = rushSpec.projects.find(
    packageSpec => packageSpec.packageName == packageName
  );

  const targetPackagePath = path.join(repoRoot, targetPackage.projectFolder);
  const packageJsonLocation = path.join(targetPackagePath, "package.json");

  const packageJsonContents = await versionUtils.readFileJson(
    packageJsonLocation
  );

  const oldVersion = packageJsonContents.version;
  console.log(`${packageName}: ${oldVersion} -> ${newVersion}`);

  if (dryRun) {
    console.log("Dry run only, no changes");
    return;
  }

  const updatedPackageJson = {
    ...packageJsonContents,
    version: newVersion
  };
  await versionUtils.writePackageJson(packageJsonLocation, updatedPackageJson);

  await versionUtils.updatePackageConstants(
    targetPackagePath,
    packageJsonContents,
    newVersion
  );
  const changelogLocation = path.join(targetPackagePath, "CHANGELOG.md");
  child = spawn("powershell.exe", ["eng/common/Update-Change-Log.ps1", newVersion, changelogLocation, false, true]);
  child.stdout.on("data", function (data) {
    console.log("Powershell Data: " + data);
  });
  child.stderr.on("data", function (data) {
    console.log("Powershell Errors: " + data);
  });
  child.on("exit", function () {
    console.log("Powershell Script finished");
  });
  child.stdin.end();
}

main(argv);
