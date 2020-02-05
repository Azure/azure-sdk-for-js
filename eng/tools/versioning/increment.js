let argv = require("yargs")
  .options({
    "artifact-name": {
      type: "string",
      describe:
        "name of the artifact to be incremented (e.g. azure-keyvault-secrets), will be translated to @azure/(package) format",
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
const semver = require("semver");
const versionUtils = require("./VersionUtils");
var spawn = require("child_process").spawn, child;

function incrementVersion(currentVersion) {
  const prerelease = semver.prerelease(currentVersion);
  if (prerelease) {
    return semver.inc(currentVersion, "prerelease");
  }

  return `${semver.inc(currentVersion, "patch")}`;
}

async function main(argv) {
  const artifactName = argv["artifact-name"];
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
  const newVersion = incrementVersion(packageJsonContents.version);
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
  const args = [newVersion, changelogLocation]
  const cwd = repoRoot

  child = spawn("powershell.exe", ["eng/common/Update-Change-Log.ps1", newVersion, changelogLocation]);
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
