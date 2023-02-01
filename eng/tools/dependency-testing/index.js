let argv = require("yargs")
  .options({
    "artifact-name": {
      type: "string",
      describe:
        "name of the artifact to be incremented (e.g. azure-keyvault-secrets), will be translated to @azure/(package) format",
      demandOption: true,
    },
    "repo-root": {
      type: "string",
      default: "../../../",
      describe: "root of the repository (e.g. ../../../)",
      demandOption: true,
    },
    "version-type": {
      type: "string",
      describe: "whether you want to test max or min or same version of dependencies",
      demandOption: true,
    },
    "source-dir": {
      type: "string",
      describe: "complete local path of the directory of the repo",
      demandOption: true,
    },
    "test-folder": {
      type: "string",
      default: "test",
      describe: "whether to point at test or test/public",
      demandOption: false,
    },
    "dry-run": {
      type: "boolean",
    },
  })
  .help().argv;

const fs = require("fs");
const path = require("path");
const semver = require("semver");
const packageUtils = require("@azure-tools/eng-package-utils");
// crossSpawn is used because of its ability to better handle corner cases that break when using spawn in Windows environments.
// For more details see - https://www.npmjs.com/package/cross-spawn
let crossSpawn = require("cross-spawn");

/**
 * This function outputs the complete local path to the test or test/public folder for devops jobs
 * @param {*} projectFolderPath - the project folder path as mentioned in rush.json
 * @param {*} sourceDir - this is the complete local path to the source repo
 * @param {*} testFolder - this is the test folder path from the package which is either test or test/public
 */
function outputTestPath(projectFolderPath, sourceDir, testFolder) {
  const projectPath = path.join(sourceDir, projectFolderPath);
  const testPath = path.join(projectPath, testFolder);
  console.log(`##vso[task.setvariable variable=PackageTestPath]${testPath}`);
  console.log(`Emitted variable "PackageTestPath" with content: ${testPath}`);
}
/**
 * This function uses the package's timeout in it's package.json for
 * the integration-test:node command for the min-max tests.
 * This function basically does a string search for "timeout" in the package's package.json
 * and replaces the command for timeout in new package.json in the test or test/public folder.
 * @param testPackageJson - the package.json that will be created in the test folder
 * @param packageJsonContents - the package's package.json contents
 */
async function usePackageTestTimeout(testPackageJson, packageJsonContents) {
  if (packageJsonContents.scripts["integration-test:node"]) {
    let replaceWithTimeout =
      packageJsonContents.scripts["integration-test:node"].match(/--timeout [0-9]+/);
    if (replaceWithTimeout !== null) {
      testPackageJson.scripts["integration-test:node"] = testPackageJson.scripts[
        "integration-test:node"
      ].replace(/--timeout [0-9]+/g, replaceWithTimeout);
    }
  }
}

/**
 * This inserts the package.json from the templates into the test folder.
 * It computes the different versions of the dependencies/ dev-dep in this package.json
 * depending on the type of version testing being done.
 * @param {*} repoRoot  - root of the repository given as input
 * @param {*} packageJsonContents - the package's package.json contents
 * @param {*} targetPackagePath - path for the package for which the min/max testing is being run
 * @param {*} targetPackageName - name of the package for which the min/max testing is being run
 * @param {*} versionType - min or max or same
 * @param {*} testFolder - this is the test folder path from the package which is either test or test/public
 * @returns
 */
async function insertPackageJson(
  repoRoot,
  packageJsonContents,
  targetPackagePath,
  targetPackageName,
  versionType,
  testFolder
) {
  const testPath = path.join(targetPackagePath, testFolder);
  let templateJson = await packageUtils.readFileJson("./templates/package.json");
  let testPackageJson = templateJson;
  if (packageJsonContents.name.startsWith("@azure/")) {
    testPackageJson.name = packageJsonContents.name.replace("@azure/", "azure-") + "-test";
  } else if (packageJsonContents.name.startsWith("@azure-rest/")) {
    testPackageJson.name =
      packageJsonContents.name.replace("@azure-rest/", "azure-rest-") + "-test";
  }
  await usePackageTestTimeout(testPackageJson, packageJsonContents);
  testPackageJson.devDependencies = {};
  depList = {};
  let allowedVersionList = {};
  depList[targetPackageName] = packageJsonContents.version; //works
  allowedVersionList[targetPackageName] = depList[targetPackageName];
  for (const package of Object.keys(packageJsonContents.dependencies)) {
    depList[package] = packageJsonContents.dependencies[package];
    depList[package] = await findAppropriateVersion(
      package,
      packageJsonContents.dependencies[package],
      repoRoot,
      versionType
    );
    if (packageJsonContents.dependencies[package] !== depList[package]) {
      console.log(package);
      allowedVersionList[package] = depList[package];
      console.log(allowedVersionList[package]);
    }
  }
  testPackageJson.dependencies = depList;

  for (const package of Object.keys(packageJsonContents.devDependencies)) {
    testPackageJson.devDependencies[package] = packageJsonContents.devDependencies[package];
    if (package.startsWith("@azure/") || package.startsWith("@azure-rest/")) {
      console.log(
        "packagejson version before func call = " + packageJsonContents.devDependencies[package]
      );
      let packageVersion = packageJsonContents.devDependencies[package];
      testPackageJson.devDependencies[package] = await findAppropriateVersion(
        package,
        packageVersion,
        repoRoot,
        versionType
      );
      console.log("packagejson version = " + packageJsonContents.devDependencies[package]);
      if (
        packageJsonContents.devDependencies[package] !== testPackageJson.devDependencies[package]
      ) {
        console.log(package);
        allowedVersionList[package] = testPackageJson.devDependencies[package];
        console.log(allowedVersionList[package]);
      }
    }
  }
  console.log(testPackageJson);
  const testPackageJsonPath = path.join(testPath, "package.json");
  await packageUtils.writePackageJson(testPackageJsonPath, testPackageJson);
  console.log(allowedVersionList);
  return allowedVersionList;
}

/**
 * Verifies if a package is a utility or not. We don't want to run min-max testing for utilities
 * @param {*} package - the package that you want to verify
 * @param {*} repoRoot - root of the repository given as input
 * @returns {bool}- true or false
 */
async function isPackageAUtility(package, repoRoot) {
  let thisPackage = await getPackageFromRush(repoRoot, package);
  if (thisPackage && thisPackage.versionPolicyName === "utility") {
    console.log(thisPackage.packageName + " utility");
    return true;
  }
  return false;
}

/**
 * This is the main heart of the min-max testing.
 * Decides the appropriate versions to be pinned of the dependencies or dev-dep in the package.json
 * @param {*} package - the package which is a depenency or dev-dependency of the targetPackage. We want to decide what version this package should be pinned to.
 * @param {*} packageJsonDepVersion - the dependency version range of the {package} in the targetPackage's package.json
 * @param {*} repoRoot - root of the repository given as input
 * @param {*} versionType - min or max or same
 * @returns
 */
async function findAppropriateVersion(package, packageJsonDepVersion, repoRoot, versionType) {
  console.log("checking " + package + " = " + packageJsonDepVersion);
  let isUtility = await isPackageAUtility(package, repoRoot);
  if (isUtility) {
    return packageJsonDepVersion;
  }
  let allNPMVersionsString = await getVersions(package);
  if (allNPMVersionsString) {
    let allVersions = JSON.parse(allNPMVersionsString);
    if (typeof allVersions === "string") {
      allVersions = [ allVersions ];
    }
    console.log(versionType);
    if (versionType === "min") {
      let minVersion = await semver.minSatisfying(
        allVersions,
        packageJsonDepVersion
      );
      if (minVersion) {
        return minVersion;
      } else {
        //issue a warning
        console.warn(
          `No matching semver min version found on npm for package ${package} with version ${packageJsonDepVersion}. Replacing with local version`
        );
        let version = await getPackageVersion(repoRoot, package);
        console.log(version);
        return version;
      }
    } else if (versionType === "max") {
      console.log("calling semver max satisfying");
      let maxVersion = await semver.maxSatisfying(
        allVersions,
        packageJsonDepVersion
      );
      if (maxVersion) {
        return maxVersion;
      } else {
        //issue a warning
        console.warn(
          `No matching semver max version found on npm for package ${package} with version ${packageJsonDepVersion}. Replacing with local version`
        );
        let version = await getPackageVersion(repoRoot, package);
        console.log(version);
        return version;
      }
    } else if (versionType === "same") {
      return packageJsonDepVersion;
    }
  }
}

async function getPackageVersion(repoRoot, package) {
  let thisPackage = await getPackageFromRush(repoRoot, package);
  console.log(thisPackage);
  let thisPackagePath = path.join(repoRoot, thisPackage.projectFolder);
  let thisPackageJsonPath = path.join(thisPackagePath, "package.json");
  let thisPackageJsonContents = await packageUtils.readFileJson(thisPackageJsonPath);
  console.log(thisPackageJsonContents);
  return thisPackageJsonContents.version;
}

function fromDir(startPath, filter, resList) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return resList;
  }

  let files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i]);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      resList = fromDir(filename, filter, resList); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      console.log("-- found: ", filename);
      resList.push(filename);
    }
  }
  return resList;
}

async function insertMochaReporter(targetPackagePath, repoRoot, testFolder) {
  const testPath = path.join(targetPackagePath, testFolder);
  const mochaPath = path.join(repoRoot, "./common/tools/mocha-multi-reporter.js");
  const mochaDestPath = path.join(testPath, "./mocha-multi-reporter.js");
  let mochaReporter = await packageUtils.readFile(mochaPath);
  await packageUtils.writeFile(mochaDestPath, mochaReporter);
}

async function insertTsConfigJson(targetPackagePath, testFolder) {
  const testPath = path.join(targetPackagePath, testFolder);
  let tsConfigJson = await packageUtils.readFileJson("./templates/tsconfig.json");

  const tsConfigPath = path.join(testPath, "tsconfig.json");
  await packageUtils.writePackageJson(tsConfigPath, tsConfigJson);
}

async function readAndReplaceSourceReferences(filePath, packageName) {
  let fileContent = await packageUtils.readFile(filePath);
  console.log("Reading filePath = " + filePath);
  testAssetsContent = fileContent.replace(
    'path.resolve(path.join(process.cwd(), "assets"',
    'path.resolve(path.join(process.cwd(),"..","..", "assets"'
  );
  // Regex for internal references = /* ["']+[../]*src[/][a-z]+["'] */
  let internalrefs = testAssetsContent.match(/[\"\']+[..//]*src[//][a-zA-Z/]+[\"\']+/g);
  let writeContent = "";
  if (internalrefs) {
    console.log("internal refs = ");
    console.log(internalrefs);
    console.log("This file has internal references will be replaced by empty content");
  } else {
    let replaceText = '"' + packageName + '"';
    //Regex for public api references to be replaced by package name
    writeContent = testAssetsContent.replace(/[\"\']+[..//]*src[//]*[\"\']+/g, replaceText);
  }
  await packageUtils.writeFile(filePath, writeContent);
}

async function replaceSourceReferences(targetPackagePath, packageName, testFolder) {
  const testPath = path.join(targetPackagePath, testFolder);
  let resList = [];
  resList = fromDir(testPath, ".ts", resList);
  console.dir(resList);
  let resPromises = [];
  for (let eachFile of resList) {
    resPromises.push(readAndReplaceSourceReferences(eachFile, packageName));
  }
  await Promise.all(resPromises);
}

async function getVersions(packageName) {
  const promise = new Promise(async (res, rej) => {
    let npmProcess = crossSpawn("npm", ["view", packageName, "versions", "--json"], {
      stdout: "inherit",
    });
    let stdOut = "";
    let stdErr = "";
    npmProcess.stdout.on("data", (data) => (stdOut = stdOut + data.toString()));
    npmProcess.stderr.on("data", (data) => (stdErr = stdErr + data.toString()));
    npmProcess.on("close", (code) => {
      console.log("`npm view " + packageName + " versions` process exit code:" + code);
      if (code !== 0) {
        rej("Process exits with code " + code);
        return;
      }
      res({ code, stdOut, stdErr });
    });
  });
  try {
    const res = await promise;
    if (res["stdErr"]) {
      console.error(res["stdErr"]);
      return false;
    }
    if (res["stdOut"]) {
      return res["stdOut"];
    }
  } catch (ex) {
    console.error("Error:", ex);
  }
}

async function updateRushConfig(repoRoot, targetPackage, testFolder) {
  let rushSpec = await packageUtils.getRushSpec(repoRoot);
  const targetPackagePath = path.join(repoRoot, targetPackage.projectFolder);
  const testPath = path.join(targetPackagePath, testFolder);
  const testPackageJsonPath = path.join(testPath, "package.json");
  let testPackageJson = await packageUtils.readFileJson(testPackageJsonPath);
  let testProjectFolder = targetPackage.projectFolder + "/" + testFolder;
  const testPackageEntry = {
    packageName: testPackageJson.name,
    projectFolder: testProjectFolder,
    versionPolicyName: "client",
  };
  rushSpec.projects.push(testPackageEntry);
  rushSpec.projectFolderMaxDepth = 5;
  const rushPath = path.resolve(path.join(repoRoot, "rush.json"));
  await packageUtils.writePackageJson(rushPath, rushSpec);
}


async function getPackageFromRush(repoRoot, packageName) {
  const rushSpec = await packageUtils.getRushSpec(repoRoot);
  const targetPackage = rushSpec.projects.find(
    (packageSpec) => packageSpec.packageName == packageName
  );
  return targetPackage;
}

async function main(argv) {
  const artifactName = argv["artifact-name"];
  const repoRoot = argv["repo-root"];
  const versionType = argv["version-type"];
  const sourceDir = argv["source-dir"];
  const testFolder = argv["test-folder"];
  const dryRun = argv["dry-run"];

  let packageName = artifactName;
  if (!artifactName.startsWith("@")) {
    packageName = artifactName.replace(/"?([a-z]*)"?-/i, "@$1/");
  }
  const targetPackage = await getPackageFromRush(repoRoot, packageName);
  const targetPackagePath = path.join(repoRoot, targetPackage.projectFolder);

  const packageJsonLocation = path.join(targetPackagePath, "package.json");

  const packageJsonContents = await packageUtils.readFileJson(packageJsonLocation);
  await insertPackageJson(
    repoRoot,
    packageJsonContents,
    targetPackagePath,
    targetPackage.packageName,
    versionType,
    testFolder
  );
  await insertTsConfigJson(targetPackagePath, testFolder);
  if (dryRun) {
    console.log("Dry run only, no changes");
    return;
  }
  await replaceSourceReferences(targetPackagePath, targetPackage.packageName, testFolder);
  await insertMochaReporter(targetPackagePath, repoRoot, testFolder);
  await updateRushConfig(repoRoot, targetPackage, testFolder);
  outputTestPath(targetPackage.projectFolder, sourceDir, testFolder);
}
main(argv);
