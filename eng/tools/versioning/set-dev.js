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
    }
  })
  .help().argv;

const path = require("path");
const versionUtils = require("./VersionUtils");

async function main(argv) {
  const buildId = argv["build-id"];
  const repoRoot = argv["repo-root"];

  const rushSpec = await versionUtils.getRushSpec(repoRoot);

  console.log(`Updating packages with Build ID ${buildId}`);

  const targetPackages = rushSpec.projects.map(project =>
    path.resolve(path.join(repoRoot, project.projectFolder))
  );

  for (const targetFolder of targetPackages) {
    const targetPackageJson = path.join(targetFolder, "package.json");
    const packageJsonContents = await versionUtils.readFileJson(
      targetPackageJson
    );
    const newVersion = `${packageJsonContents.version}-dev-${buildId}`;
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
