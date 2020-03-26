let argv = require("yargs")
  .options({
    "package-name": {
      type: "string",
      describe:
        "name of the artifact to be set (e.g. azure-keyvault-secrets), will be translated to @azure/(package) format",
      demandOption: true
    },
    "repo-root": {
      type: "string",
      default: "../../../",
      describe: "root of the repository (e.g. ../../../)",
      demandOption: true
    }
  })
  .help().argv;

const versionUtils = require("./VersionUtils");
const path = require("path");
async function main(argv) {
  try {
    const packageName = argv["package-name"];
    const repoRoot = argv["repo-root"];
    const rushSpec = await versionUtils.getRushSpec(repoRoot);

    const targetPackage = rushSpec.projects.find(
      packageSpec => packageSpec.packageName == packageName
    );

    const targetPackagePath = path.join(repoRoot, targetPackage.projectFolder);
    console.log(`##vso[task.setvariable variable=PackagePath]${targetPackagePath}`);
    //log(`Emitted variable "PackagePath" with content: ${targetPackagePath}`);
  }
  catch (ex) {
    console.error(ex);
  }
}

main(argv);
