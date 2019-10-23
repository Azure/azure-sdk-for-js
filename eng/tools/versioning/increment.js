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
    },
    "dry-run": {
      type: "boolean"
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
  const dryRun = argv["dry-run"];

  const packageName = artifactName.replace("azure-", "@azure/");
  const rushSpec = await versionUtils.getRushSpec(repoRoot);

  const targetPackage = rushSpec.projects.find(
    packageSpec => packageSpec.packageName == packageName
  );
  const targetFile = path.resolve(
    path.join(repoRoot, targetPackage.projectFolder, "package.json")
  );

  const packageJsonContents = await versionUtils.readFileJson(targetFile);

  const oldVersion = packageJsonContents.version;
  const newVersion = incrementVersion(packageJsonContents.version);
  console.log(`${packageName}: ${oldVersion} -> ${newVersion}`);

  if (dryRun) {
    console.log("Dry run only, no changes");
    return;
  }

  // Update package.json
  const updatedPackageJson = {
    ...packageJsonContents,
    version: newVersion
  };
  await versionUtils.writePackageJson(targetFile, updatedPackageJson);

  // Update constants
  // This is done to update files which are only periodically generated and
  // checked in. Since these files could be generated once between many versions
  // we need to make sure that the versions in the generated files progress
  // as well

  // No constant metadata, skip
  if (!("//metadata" in updatedPackageJson)) {
    return;
  }

  for (const constantFilePath of updatedPackageJson["//metadata"]
    .constantPaths) {
    const targetPath = path.join(
      repoRoot,
      targetPackage.projectFolder,
      constantFilePath
    );
    const fileContents = await versionUtils.readFile(targetPath);

    const updatedContents = fileContents.replace(
      versionUtils.semverRegex,
      newVersion
    );

    if (updatedContents == fileContents) {
      continue;
    }

    await versionUtils.writeFile(targetPath, updatedContents);
  }
}

main(argv);
