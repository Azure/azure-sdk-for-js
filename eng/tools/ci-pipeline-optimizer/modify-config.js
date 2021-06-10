let argv = require("yargs")
  .options({
    "repo-root": {
      type: "string",
      default: ".",
      describe: "root of the repository (e.g. ../../)",
      demandOption: true
    },
    "testType": {
      type: "string",
      default: "node",
      describe: "mode of test. possible values: node or browser",
      demandOption: true
    }
  })
  .help().argv;

const path = require("path");
const packageUtils = require("eng-package-utils");

async function main(argv) {
  const repoRoot = argv["repo-root"];
  const testType = argv["testType"];
  const configChangeExclusion = ['@azure/cosmos'];
  const apiExtractCommand = "api-extractor run --local";

  if (testType === "node") {
    const rushSpec = await packageUtils.getRushSpec(repoRoot);
    let count = 0;
    // Replace API-Extractor command with dummy echo statement for all projects in rush
    for (const project of rushSpec.projects) {
      if (project.packageName.includes("@azure/") && configChangeExclusion.indexOf(project.packageName) < 0) {
        const targetPackagePath = path.join(repoRoot, project.projectFolder);
        const packageJsonLocation = path.join(targetPackagePath, "package.json");
        const packageJsonContents = await packageUtils.readFileJson(packageJsonLocation);

        for (let [name, value] of Object.entries(packageJsonContents.scripts)) {
          if (name === "build:browser") {
            packageJsonContents.scripts[name] = "echo skipped";
          }
        }
        await packageUtils.writePackageJson(packageJsonLocation, packageJsonContents);
      }
    }
  }
}

main(argv);
