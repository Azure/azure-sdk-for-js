let argv = require("yargs")
  .options({
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
const versionUtils = require("./VersionUtils");

async function main() {
  const repoRoot = argv["repo-root"];
  const dryRun = argv["dry-run"];

  const rushSpec = await versionUtils.getRushSpec(repoRoot);

  for (package of rushSpec.projects) {
    const packageJsonLocation = path.resolve(
      path.join(repoRoot, package.projectFolder, "package.json")
    );

    const packageJson = await versionUtils.readFileJson(packageJsonLocation);
    const packageJsonVersion = packageJson.version;

    // No constant metadata, skip
    if (!("//metadata" in packageJson)) {
      continue;
    }

    for (const constantFilePath of packageJson["//metadata"].constantPaths) {
      const targetPath = path.join(
        repoRoot,
        package.projectFolder,
        constantFilePath
      );
      const fileContents = await versionUtils.readFile(targetPath);

      const updatedContents = fileContents.replace(
        versionUtils.semverRegex,
        packageJsonVersion
      );

      if (updatedContents == fileContents) {
        continue;
      }

      console.log(
        `version mismatch: package: ${package.packageName}, package.json version: ${packageJsonVersion}, constants file: ${constantFilePath}`
      );

      if (dryRun) {
        console.log("Dry run only, no changes");
        continue;
      }
      await versionUtils.writeFile(targetPath, updatedContents);
    }
  }
}
main();
