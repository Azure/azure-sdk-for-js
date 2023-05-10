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
const packageUtils = require("@azure-tools/eng-package-utils");

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

  const rushSpec = await packageUtils.getRushSpec(repoRoot);
  const targetPackage = rushSpec.projects.find(
    (packageSpec) => packageSpec.packageName.replace("@", "").replace("/", "-") == artifactName
  );

  const targetPackagePath = path.join(repoRoot, targetPackage.projectFolder);
  const packageJsonLocation = path.join(targetPackagePath, "package.json");

  const packageJsonContents = await packageUtils.readFileJson(packageJsonLocation);

  const oldVersion = packageJsonContents.version;
  const newVersion = incrementVersion(packageJsonContents.version);
  console.log(`${packageJsonContents.name}: ${oldVersion} -> ${newVersion}`);

  if (dryRun) {
    console.log("Dry run only, no changes");
    return;
  }

  const updatedPackageJson = {
    ...packageJsonContents,
    version: newVersion
  };
  await packageUtils.writePackageJson(packageJsonLocation, updatedPackageJson);

  await versionUtils.updatePackageConstants(targetPackagePath, packageJsonContents, newVersion);
  const updateStatus = versionUtils.updateChangelog(
    targetPackagePath,
    artifactName,
    repoRoot,
    newVersion,
    true,
    false
  );
  if (!updateStatus) {
    process.exit(1);
  }
}
main(argv);
