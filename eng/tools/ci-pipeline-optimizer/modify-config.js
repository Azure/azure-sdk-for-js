let argv = require("yargs")
  .options({
    "test-mode": {
      type: "string",
      describe:
        "node test or browser test. value should be either node or browser",
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
const packageUtils = require("eng-package-utils");

async function main(argv) {
  const artifactName = argv["test-mode"];
  const repoRoot = argv["repo-root"];

  const rushSpec = await packageUtils.getRushSpec(repoRoot);
  let count = 0;
  for (const project of rushSpec.projects) {
    const targetPackagePath = path.join(repoRoot, project.projectFolder);
    const packageJsonLocation = path.join(targetPackagePath, "package.json");
    const packageJsonContents = await packageUtils.readFileJson(packageJsonLocation);

    for (let [name, value] of Object.entries(packageJsonContents.scripts)) {
      if (name === "extract-api") {
        console.log(`${packageJsonContents.name} : ${name} : ${value}`);
        value = `echo skipped`;
        packageJsonContents.scripts[name] = value;
      }

      if (value.includes("api-extractor run --local")) {
        console.log(`${packageJsonContents.name} : ${name} : ${value}`);
        packageJsonContents.scripts[name] = value.replace("api-extractor run --local", "echo skipped");
        console.log(`${packageJsonContents.name} : ${packageJsonContents.scripts[name]}`);
      }
    }

    await packageUtils.writePackageJson(packageJsonLocation, packageJsonContents);
  }
}

main(argv);
