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

  const targetPackageFiles = rushSpec.projects.map(project =>
    path.resolve(path.join(repoRoot, project.projectFolder, "package.json"))
  );

  for (const targetFile of targetPackageFiles) {
    const targetFileContents = await versionUtils.readFileJson(targetFile);
    const newVersion = `${targetFileContents.version}-dev-${buildId}`;
    console.log(`File ${targetFile} version updated to ${newVersion}`);
    const updatedPackageSpec = {
      ...targetFileContents,
      version: newVersion
    };
    await versionUtils.writePackageJson(targetFile, updatedPackageSpec);
  }
}

main(argv);
