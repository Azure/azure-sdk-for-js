let argv = require("yargs")
  .options({
    "build-id": {
      type: "string",
      describe: "build ID suffix to give the package (e.g. usually YYYYMMDD.r)",
      demandOption: true
    },
    "repo-root": {
      type: "string",
      describe: "root of the repository (e.g. ../../../)",
      demandOption: true
    },
    service: {
      type: "string",
      describe:
        "service directory whose packages should be updated (if not set updates all directories)"
    }
  })
  .help().argv;

const path = require("path");
const semver = require("semver");
const versionUtils = require("./VersionUtils");

function getDevVersion(currentVersion, buildId) {
  const prerelease = semver.prerelease(currentVersion);
  if (prerelease) {
    return `${currentVersion}.${buildId}`;
  }

  return `${currentVersion}-dev.${buildId}`;
}

async function main(argv) {
  const buildId = argv["build-id"];
  const repoRoot = argv["repo-root"];
  const service = argv["service"];

  const rushSpec = await versionUtils.getRushSpec(repoRoot);

  console.log(`Updating packages with Build ID ${buildId}`);

  const scopedPackages = rushSpec.projects.filter(package =>
    service ? package.projectFolder.startsWith(`sdk/${service}`) : true
  );

  let targetPackages = scopedPackages.map(project =>
    path.resolve(path.join(repoRoot, project.projectFolder))
  );

  for (const targetFolder of targetPackages) {
    const targetPackageJson = path.join(targetFolder, "package.json");
    const packageJsonContents = await versionUtils.readFileJson(
      targetPackageJson
    );
    const newVersion = getDevVersion(packageJsonContents.version, buildId);
    console.log(`File ${targetPackageJson} version updated to ${newVersion}`);
    const updatedPackageSpec = {
      ...packageJsonContents,
      version: newVersion
    };
    await versionUtils.writePackageJson(targetPackageJson, updatedPackageSpec);

    await versionUtils.updatePackageConstants(
      targetFolder,
      packageJsonContents,
      newVersion
    );
  }
}

main(argv);
