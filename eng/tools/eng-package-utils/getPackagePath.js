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

const { getRushSpec } = require("./index");
const path = require("path");

async function main(argv) {
  const packageName = argv["package-name"];
  const repoRoot = argv["repo-root"];
  const rushSpec = await getRushSpec(repoRoot);

  const targetPackage = rushSpec.projects.find(
    packageSpec => packageSpec.packageName == packageName
  );

  const targetPackagePath = path.join(repoRoot, targetPackage.projectFolder);
  console.log(`##vso[task.setvariable variable=PackagePath]${targetPackagePath}`);
  console.log(`Emitted variable "PackagePath" with content: ${targetPackagePath}`);
}

main(argv);
