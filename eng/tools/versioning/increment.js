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
      describe: "root of the repository (e.g. ../../../)",
      demandOption: true
    }
  })
  .help().argv;

const path = require("path");
const semver = require("semver");
const versionUtils = require("./VersionUtils");

function incrementVersion(currentVersion) {
  const prerelease = semver.prerelease(currentVersion);
  if (prerelease) {
    return semver.inc(currentVersion, "prerelease");
  }

  return `${semver.inc(currentVersion, "minor")}-preview.1`;
}

async function main(argv) {
  const artifactName = argv["artifact-name"];
  const repoRoot = argv["repo-root"];

  const packageName = artifactName.replace("azure-", "@azure/");
  const rushSpec = await versionUtils.getRushSpec(repoRoot);

  const targetPackage = rushSpec.projects.find(
    packageSpec => packageSpec.packageName == packageName
  );
  const targetFile = path.resolve(
    path.join(repoRoot, targetPackage.projectFolder, "package.json")
  );

  const targetFileContents = await versionUtils.readFileJson(targetFile);
  const newVersion = incrementVersion(targetFileContents.version);
  console.log(`File ${targetFile} version updated to ${newVersion}`);
  const updatedPackageJson = {
    ...targetFileContents,
    version: newVersion
  };
  await versionUtils.writePackageJson(targetFile, updatedPackageJson);
}

main(argv);
