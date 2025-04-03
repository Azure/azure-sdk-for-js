let argv = require("yargs")
  .options({
    "artifact-name": {
      type: "string",
      describe:
        "name of the artifact to be set (e.g. azure-keyvault-secrets), will be translated to @azure/(package) format",
      demandOption: true,
    },
    "new-version": {
      type: "string",
      describe: "package version string",
      demandOption: true,
    },
    "release-date": {
      type: "string",
      default: new Date().toISOString().slice(0, 10),
      describe: "the date of intended release",
      demandOption: false,
    },
    "replace-latest-entry-title": {
      type: "string",
      default: true,
      describe: "indicates if to replace the latest changelog entry",
      demandOption: false,
    },
    "repo-root": {
      type: "string",
      default: "../../../",
      describe: "root of the repository (e.g. ../../../)",
      demandOption: true,
    },
    "dry-run": {
      type: "boolean",
    },
  })
  .help().argv;

const path = require("path");
const versionUtils = require("./VersionUtils");
const packageUtils = require("@azure-tools/eng-package-utils");

async function main(argv) {
  const artifactName = argv["artifact-name"];
  const newVersion = argv["new-version"];
  const releaseDate = argv["release-date"];
  const replaceLatestEntryTitle = argv["replace-latest-entry-title"];
  const repoRoot = argv["repo-root"];
  const dryRun = argv["dry-run"];

  const pkgs = (
    await findPackages(repoRoot, {
      patterns: ["sdk/*/*", "common/tools/*"],
    })
  ).filter((pkg) => pkg.manifest.namereplace("@", "").replace("/", "-") == artifactName);
  const targetPackagePath = pkgs[0].rootDirRealPath;
  const packageJsonLocation = path.join(targetPackagePath, "package.json");

  const packageJsonContents = await packageUtils.readFileJson(packageJsonLocation);

  const oldVersion = packageJsonContents.version;
  console.log(`${packageJsonContents.name}: ${oldVersion} -> ${newVersion}`);

  if (dryRun) {
    console.log("Dry run only, no changes");
    return;
  }

  const updatedPackageJson = {
    ...packageJsonContents,
    version: newVersion,
  };
  await packageUtils.writePackageJson(packageJsonLocation, updatedPackageJson);

  await versionUtils.updatePackageConstants(targetPackagePath, packageJsonContents, newVersion);

  const updateStatus = versionUtils.updateChangelog(
    targetPackagePath,
    artifactName,
    repoRoot,
    newVersion,
    false,
    replaceLatestEntryTitle,
    releaseDate,
  );
  if (!updateStatus) {
    process.exit(1);
  }
}

main(argv);
