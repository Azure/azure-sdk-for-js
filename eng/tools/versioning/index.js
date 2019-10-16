let argv = require("yargs")
  .options({
    operation: {
      type: "choices",
      describe:
        "operation to perform (set-dev: sets a development version, increment: increments a package's version after release)",
      choices: ["set-dev", "increment"],
      demandOption: true
    },
    "artifact-name": {
      type: "string",
      describe:
        "name of the artifact to be incremented (e.g. azure-keyvault-secrets), will be translated to @azure/(package) format"
    },
    "repo-root": {
      type: "string",
      describe: "root of the repository (e.g. ../../../)"
    },
    "build-id": {
      type: "string",
      describe: "build id (generally of the form YYYYMMDD.r)"
    }
  })
  .help().argv;

const fs = require("fs");
const path = require("path");
const versionUtils = require("./VersionUtils");
const parse = require("../../../common/lib/jju/parse").parse;

async function readFileJson(filename) {
  try {
    const fileContents = await fs.promises.readFile(filename, {
      encoding: "utf-8"
    });
    const jsonResult = parse(fileContents);
    return jsonResult;
  } catch (ex) {
    console.error(ex);
  }
}

async function writePackageJson(filename, contentObject) {
  try {
    const contentString = JSON.stringify(contentObject, null, "  ");
    await fs.promises.writeFile(filename, contentString);
  } catch (ex) {
    console.error(ex);
  }
}

async function incrementVersion(artifactName, repoRoot) {
  const packageName = artifactName.replace("azure-", "@azure/");
  const rushPath = path.resolve(`${repoRoot}/rush.json`);
  const rushSpec = await readFileJson(rushPath);

  const targetPackage = rushSpec.projects.find(
    packageSpec => packageSpec.packageName == packageName
  );
  const targetFile = path.resolve(
    `${repoRoot}/${targetPackage.projectFolder}/package.json`
  );

  const targetFileContents = await readFileJson(targetFile);

  const updatedPackageJson = {
    ...targetFileContents,
    version: versionUtils.incrementVersion(targetFileContents.version)
  };
  await writePackageJson(targetFile, updatedPackageJson);
}

function ensureDefined(value) {
  if (value == undefined) {
    throw "parameter missing";
  }
  return value;
}

async function setDev(repoRoot, buildId) {
  const rushPath = path.resolve(`${repoRoot}/rush.json`);
  const rushSpec = await readFileJson(rushPath);

  console.log(`Updating packages with Build ID ${buildId}`);

  const targetPackageFiles = rushSpec.projects.map(project =>
    path.resolve(`${repoRoot}/${project.projectFolder}/package.json`)
  );

  for (const targetFile of targetPackageFiles) {
    const targetFileContents = await readFileJson(targetFile);
    const newVersion = `${targetFileContents.version}-dev-${buildId}`;
    console.log(`File ${targetFile} version updated to ${newVersion}`);
    const updatedPackageSpec = {
      ...targetFileContents,
      version: newVersion
    };
    await writePackageJson(targetFile, updatedPackageSpec);
  }
}

async function main(argv) {
  const operation = argv["operation"];
  const artifactName = argv["artifact-name"];
  const repoRoot = argv["repo-root"];
  const buildId = argv["build-id"];

  if (operation == "increment") {
    await incrementVersion(
      ensureDefined(artifactName),
      ensureDefined(repoRoot)
    );
  } else if (operation == "set-dev") {
    await setDev(ensureDefined(repoRoot), ensureDefined(buildId));
  }
}

main(argv);
