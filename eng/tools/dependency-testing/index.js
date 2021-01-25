let argv = require("yargs")
  .options({
    "artifact-name": {
      type: "string",
      describe:
        "name of the artifact to be incremented (e.g. azure-keyvault-secrets), will be translated to @azure/(package) format",
      demandOption: true
    },
    "repo-root": {
      type: "string",
      default: "../../../",
      describe: "root of the repository (e.g. ../../../)",
      demandOption: true
    },
    "version-type": {
      type: "string",
      describe: "whether you want to test max or min or same version of dependencies",
      demandOption: true
    },
    "source-dir": {
      type: "string",
      describe: "complete local path of the directory of the repo",
      demandOption: true
    },
    "test-folder": {
      type: "string",
      default: "test",
      describe: "whether to point at test or test/public",
      demandOption: false
    },
    "dry-run": {
      type: "boolean"
    }
  })
  .help().argv;

const fs = require("fs");
const path = require("path");
const semver = require("semver");
const packageUtils = require("eng-package-utils");
// crossSpawn is used because of its ability to better handle corner cases that break when using spawn in Windows environments.
// For more details see - https://www.npmjs.com/package/cross-spawn
var crossSpawn = require("cross-spawn");

function outputTestPath(projectFolderPath, sourceDir, testFolder) {
  const projectPath = path.join(sourceDir, projectFolderPath);
  const testPath = path.join(projectPath, testFolder);
  console.log(`##vso[task.setvariable variable=PackageTestPath]${testPath}`)
  console.log(`Emitted variable "PackageTestPath" with content: ${testPath}`)
}

async function insertPackageJson(repoRoot, packageJsonContents, targetPackagePath, targetPackageName, versionType, testFolder) {
  const testPath = path.join(targetPackagePath, testFolder);
  var templateJson = await packageUtils.readFileJson("./templates/package.json");
  var testPackageJson = templateJson;
  testPackageJson.name = packageJsonContents.name.replace("@azure/", "azure-") + "-test";
  testPackageJson.devDependencies = {};
  depList = {};
  var projectFolder = path.basename(targetPackagePath);
  var projectDir = path.basename(path.dirname(targetPackagePath));
  var allowedVersionList = {};
  depList[targetPackageName] = packageJsonContents.version;//works
  allowedVersionList[targetPackageName] = depList[targetPackageName];
  for (const package of Object.keys(packageJsonContents.dependencies)) {
    depList[package] = packageJsonContents.dependencies[package];
    if (package.startsWith("@azure/")) {
      depList[package] = await findAppropriateVersion(package, packageJsonContents.dependencies[package], repoRoot, versionType);
      if (packageJsonContents.dependencies[package] !== depList[package]) {
        console.log(package);
        allowedVersionList[package] = depList[package];
        console.log(allowedVersionList[package]);
      }
    }
  }
  testPackageJson.dependencies = depList;

  for (const package of Object.keys(packageJsonContents.devDependencies)) {
    testPackageJson.devDependencies[package] = packageJsonContents.devDependencies[package];
    if (package.startsWith("@azure/")) {
      console.log("packagejson version before func call = " + packageJsonContents.devDependencies[package]);
      var packageVersion = packageJsonContents.devDependencies[package];
      testPackageJson.devDependencies[package] = await findAppropriateVersion(package, packageVersion, repoRoot, versionType);
      console.log("packagejson version = " + packageJsonContents.devDependencies[package]);
      if (packageJsonContents.devDependencies[package] !== testPackageJson.devDependencies[package]) {
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


async function isPackageAUtility(package, repoRoot) {
  var thisPackage = await getPackageFromRush(repoRoot, package);
  if (thisPackage.versionPolicyName === "utility") {
    console.log(thisPackage.packageName + " utility");
    return true;
  }
  return false;
}

async function findAppropriateVersion(package, packageJsonDepVersion, repoRoot, versionType) {
  console.log("checking " + package + " = " + packageJsonDepVersion);
  var isUtility = await isPackageAUtility(package, repoRoot);
  if (isUtility) {
    return packageJsonDepVersion;
  }
  else {
    var allNPMVersions = await getVersions(package);
    if (allNPMVersions) {
      console.log(versionType);
      if (versionType === "min") {
        var minVersion = await semver.minSatisfying(JSON.parse(allNPMVersions), packageJsonDepVersion);
        if (minVersion) {
          return minVersion;
        }
        else {
          //issue a warning
          console.warn(`No matching semver min version found on npm for package ${package} with version ${packageJsonDepVersion}. Replacing with local version`);
          var version = await getPackageVersion(repoRoot, package);
          console.log(version);
          return version;
        }
      }
      else if (versionType === "max") {
        console.log("calling semver max satisfying");
        var maxVersion = await semver.maxSatisfying(JSON.parse(allNPMVersions), packageJsonDepVersion);
        if (maxVersion) {
          return maxVersion;
        }
        else {
          //issue a warning
          console.warn(`No matching semver max version found on npm for package ${package} with version ${packageJsonDepVersion}. Replacing with local version`);
          var version = await getPackageVersion(repoRoot, package);
          console.log(version);
          return version;
        }
      }
      else if (versionType === "same") {
        return packageJsonDepVersion;
      }
    }
  }
}

async function getPackageVersion(repoRoot, package) {
  var thisPackage = await getPackageFromRush(repoRoot, package);
  console.log(thisPackage);
  var thisPackagePath = path.join(repoRoot, thisPackage.projectFolder);
  var thisPackageJsonPath = path.join(thisPackagePath, "package.json");
  var thisPackageJsonContents = await packageUtils.readFileJson(thisPackageJsonPath);
  console.log(thisPackageJsonContents);
  return thisPackageJsonContents.version;
}

function fromDir(startPath, filter, resList) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return resList;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      resList = fromDir(filename, filter, resList); //recurse
    }
    else if (filename.indexOf(filter) >= 0) {
      console.log('-- found: ', filename);
      resList.push(filename);
    };
  };
  return resList;
};

async function insertMochaReporter(targetPackagePath, repoRoot, testFolder) {
  const testPath = path.join(targetPackagePath, testFolder);
  const mochaPath = path.join(repoRoot, "./common/tools/mocha-multi-reporter.js");
  const mochaDestPath = path.join(testPath, "./mocha-multi-reporter.js");
  var mochaReporter = await packageUtils.readFile(mochaPath);
  await packageUtils.writeFile(mochaDestPath, mochaReporter);
}

async function insertTsConfigJson(targetPackagePath, testFolder) {
  const testPath = path.join(targetPackagePath, testFolder);
  var tsConfigJson = await packageUtils.readFileJson("./templates/tsconfig.json");

  const tsConfigPath = path.join(testPath, "tsconfig.json");
  await packageUtils.writePackageJson(tsConfigPath, tsConfigJson);
}

async function readAndReplaceSourceReferences(filePath, packageName) {
  var fileContent = await packageUtils.readFile(filePath);
  console.log("Reading filePath = " + filePath);
  testAssetsContent = fileContent.replace('path.resolve(path.join(process.cwd(), "test-assets"','path.resolve(path.join(process.cwd(),"..","..", "test-assets"');
  // Regex for internal references = /* ["']+[../]*src[/][a-z]+["'] */
  var internalrefs = testAssetsContent.match(/[\"\']+[..//]*src[//][a-zA-Z]+[\"\']+/g);
  var writeContent = "";
  if (internalrefs) {
    console.log("internal refs = ");
    console.log(internalrefs);
    console.log("This file has internal references will be replaced by empty content");
  }
  else {
    var replaceText = "\"" + packageName + "\"";
    //Regex for public api references to be replaced by package name
    writeContent = testAssetsContent.replace(/[\"\']+[..//]*src[//]*[\"\']+/g, replaceText);
  }
  await packageUtils.writeFile(filePath, writeContent);
}

async function replaceSourceReferences(targetPackagePath, packageName, testFolder) {
  const testPath = path.join(targetPackagePath, testFolder);
  var resList = [];
  resList = fromDir(testPath, '.ts', resList);
  console.dir(resList);
  var resPromises = [];
  for (var eachFile of resList) {
    resPromises.push(readAndReplaceSourceReferences(eachFile, packageName));
  }
  await Promise.all(resPromises);
}

async function getVersions(packageName) {
  const promise = new Promise(async (res, rej) => {
    let npmProcess = crossSpawn('npm', ['view', packageName, 'versions', '--json'], { stdout: 'inherit' });
    let stdOut = "";
    let stdErr = "";
    npmProcess.stdout.on(
      "data",
      data => (stdOut = stdOut + data.toString())
    );
    npmProcess.stderr.on(
      "data",
      data => (stdErr = stdErr + data.toString())
    );
    npmProcess.on("close", code => {
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
      return (res["stdOut"]);
    }
  }
  catch (ex) {
    console.error("Error:", ex);
  }
}

async function updateRushConfig(repoRoot, targetPackage, testFolder) {
  var rushSpec = await packageUtils.getRushSpec(repoRoot);
  const targetPackagePath = path.join(repoRoot, targetPackage.projectFolder);
  const testPath = path.join(targetPackagePath, testFolder);
  const testPackageJsonPath = path.join(testPath, "package.json");
  var testPackageJson = await packageUtils.readFileJson(testPackageJsonPath);
  var testProjectFolder = targetPackage.projectFolder + "/" + testFolder;
  const testPackageEntry = {
    "packageName": testPackageJson.name,
    "projectFolder": testProjectFolder,
    "versionPolicyName": "client"
  };
  rushSpec.projects.push(testPackageEntry);
  rushSpec.projectFolderMaxDepth = 5;
  const rushPath = path.resolve(path.join(repoRoot, "rush.json"));
  await packageUtils.writePackageJson(rushPath, rushSpec);
  console.log("rush spec -");
  console.log(rushSpec);
}

async function updateCommonVersions(repoRoot, allowedVersionList) {
  const commonVersionsConfig = await packageUtils.getRushCommonVersions(repoRoot);
  var allowedAlternativeVersions = commonVersionsConfig["allowedAlternativeVersions"];
  console.dir(allowedVersionList);
  console.dir(allowedAlternativeVersions);
  for (const package in allowedVersionList) {
    console.log(package);
    console.log(allowedVersionList[package]);
    if (allowedVersionList[package] && !allowedAlternativeVersions[package]) {
      allowedAlternativeVersions[package] = [allowedVersionList[package]];
    }
    else if (allowedVersionList[package] && !allowedAlternativeVersions[package].includes(allowedVersionList[package])) {
      allowedAlternativeVersions[package].push(allowedVersionList[package]);
    }
  }
  console.dir(allowedAlternativeVersions);
  var newConfig = commonVersionsConfig;
  newConfig["allowedAlternativeVersions"] = allowedAlternativeVersions;
  const commonVersionsPath = path.resolve(path.join(repoRoot, "/common/config/rush/common-versions.json"));
  console.log(newConfig);
  await packageUtils.writePackageJson(commonVersionsPath, newConfig);
}

async function getPackageFromRush(repoRoot, packageName) {
  const rushSpec = await packageUtils.getRushSpec(repoRoot);
  const targetPackage = rushSpec.projects.find(
    packageSpec => packageSpec.packageName == packageName
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

  const packageJsonContents = await packageUtils.readFileJson(
    packageJsonLocation
  );
  const allowedVersionList = await insertPackageJson(repoRoot, packageJsonContents, targetPackagePath, targetPackage.packageName, versionType, testFolder);
  await insertTsConfigJson(targetPackagePath, testFolder);
  if (dryRun) {
    console.log("Dry run only, no changes");
    return;
  }
  await replaceSourceReferences(targetPackagePath, targetPackage.packageName, testFolder);
  await insertMochaReporter(targetPackagePath, repoRoot, testFolder);
  await updateRushConfig(repoRoot, targetPackage, testFolder);
  await updateCommonVersions(repoRoot, allowedVersionList);
  outputTestPath(targetPackage.projectFolder, sourceDir, testFolder);
}
main(argv);
