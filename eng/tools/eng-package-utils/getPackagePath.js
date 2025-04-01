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

const path = require("path");
const {findPackages} = require('@pnpm/fs.find-packages')

async function main(argv) {
  const packageName = argv["package-name"];
  const repoRoot = argv["repo-root"];

  const pkgs = (await findPackages(repoRoot, {
    patterns: ["sdk/*/*", "common/tools/*"]
  })).filter(pkg => pkg.manifest.name === packageName);

  const targetPackagePath = pkgs[0].rootDirRealPath;
  
  console.log(`##vso[task.setvariable variable=PackagePath]${targetPackagePath}`);
  console.log(`Emitted variable "PackagePath" with content: ${targetPackagePath}`);
}

main(argv);
