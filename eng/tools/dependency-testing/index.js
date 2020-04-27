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
      describe: "whether you want to test max or min version of dependencies",
      demandOption: true
    },
    "source-dir": {
      type: "string",
      describe: "complete local path of the directory of the repo",
      demandOption: true
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

function outputTestPath(projectFolderPath, sourceDir) {
  const projectPath = path.join(sourceDir, projectFolderPath);
  const testPath = path.join(projectPath, "test");
  console.log(`##vso[task.setvariable variable=PackageTestPath]${testPath}`)
  console.log(`Emitted variable "PackageTestPath" with content: ${testPath}`)
}

async function insertPackageJson(repoRoot, packageJsonContents, targetPackagePath, targetPackageName, versionType) {
  const testPath = path.join(targetPackagePath, "test");
  var templateJson = await packageUtils.readFileJson("./templates/package.json");
  console.log(templateJson);
  var testPackageJson = templateJson;
  testPackageJson.name = packageJsonContents.name.replace("@azure/", "azure-") + "-test";
  testPackageJson.devDependencies = packageJsonContents.devDependencies;
  depList = {};
  var projectFolder = path.basename(targetPackagePath);
  var projectDir = path.basename(path.dirname(targetPackagePath));
  console.log(projectFolder);
  console.log(projectDir);
  //depList[targetPackageName] = "..";//works
  //depList[targetPackageName] = "../../../" + projectDir + "/" + projectFolder;
  depList[targetPackageName] = "..";
  //depList[targetPackageName] = "dev";//works
  for (const package of Object.keys(packageJsonContents.dependencies)) {
    if (package.startsWith("@azure/")) {
      depList[package] = await findAppropriateVersion(package, packageJsonContents.dependencies[package], repoRoot, testPath, versionType);
    }
  }
  testPackageJson.dependencies = depList;

  for (const package of Object.keys(packageJsonContents.devDependencies)) {
    if (package.startsWith("@azure/")) {
      if (package.match("@azure/test-utils-recorder")) {
        testPackageJson.devDependencies["@azure/test-utils-recorder"] = "../../../test-utils/recorder";
      }
      else {
        testPackageJson.devDependencies[package] = await findAppropriateVersion(package, packageJsonContents.devDependencies[package], repoRoot, testPath, versionType);
      }
    }
  }

  console.log(testPackageJson);
  const testPackageJsonPath = path.join(testPath, "package.json");
  await packageUtils.writePackageJson(testPackageJsonPath, testPackageJson);
}

async function findAppropriateVersion(package, packageJsonDepVersion, repoRoot, testPath, versionType) {
  var allNPMVersions = await getVersions(package);
  if (allNPMVersions) {
    if (versionType === "min") {
      var minVersion = semver.minSatisfying(JSON.parse(allNPMVersions), packageJsonDepVersion);
      if (minVersion) {
        return minVersion;
      }
      else {
        //issue a warning
        console.warn(`No matching semver min version found on npm for package ${package} with version ${packageJsonDepVersion}. Replacing with local version`);
        var thisPackage = await getPackageFromRush(repoRoot, package);
        var thisPackagePath = path.join(repoRoot, thisPackage.projectFolder);
        var relativePath = path.relative(testPath, thisPackagePath);
        console.log(`local path - ${relativePath}`);
        return relativePath;
      }
    }
    else if (versionType === "max") {
      var maxVersion = semver.maxSatisfying(JSON.parse(allNPMVersions), packageJsonDepVersion);
      if (maxVersion) {
        return maxVersion;
      }
      else {
        //issue a warning
        console.warn(`No matching semver max version found on npm for package ${package} with version ${packageJsonDepVersion}. Replacing with local version`);
        var thisPackage = await getPackageFromRush(repoRoot, package);
        var thisPackagePath = path.join(repoRoot, thisPackage.projectFolder);
        var relativePath = path.relative(testPath, thisPackagePath);
        console.log(`local path - ${relativePath}`);
        return relativePath;
      }
    }
  }
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

async function insertMochaReporter(targetPackagePath, repoRoot) {
  const testPath = path.join(targetPackagePath, "test");
  const mochaPath = path.join(repoRoot, "./common/tools/mocha-multi-reporter.js");
  const mochaDestPath = path.join(testPath, "./mocha-multi-reporter.js");
  var mochaReporter = await packageUtils.readFile(mochaPath);
  await packageUtils.writeFile(mochaDestPath, mochaReporter);
}

async function insertTsConfigJson(targetPackagePath) {
  const testPath = path.join(targetPackagePath, "test");
  var tsConfigJson = await packageUtils.readFileJson("./templates/tsconfig.json");
  var tsConfigTestsJson = await packageUtils.readFileJson("./templates/tsconfig.tests.json");
  const tsConfigPath = path.join(testPath, "tsconfig.json");
  const tsConfigTestsPath = path.join(targetPackagePath, "tsconfig.tests.json");
  await packageUtils.writePackageJson(tsConfigPath, tsConfigJson);
  await packageUtils.writePackageJson(tsConfigTestsPath, tsConfigTestsJson);
}

async function readAndReplaceSourceReferences(filePath, packageName) {
  var fileContent = await packageUtils.readFile(filePath);
  var replaceText = "\"" + packageName + "\"";
  var res = fileContent.replace(/[\"\']+[..//]*src[\"\']+/g, replaceText);
  await packageUtils.writeFile(filePath, res);
}

async function replaceSourceReferences(targetPackagePath, packageName) {
  const testPath = path.join(targetPackagePath, "test");
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
  const dryRun = argv["dry-run"];

  const packageName = artifactName.replace("azure-", "@azure/");
  const targetPackage = await getPackageFromRush(repoRoot, packageName);
  const targetPackagePath = path.join(repoRoot, targetPackage.projectFolder);

  const packageJsonLocation = path.join(targetPackagePath, "package.json");

  const packageJsonContents = await packageUtils.readFileJson(
    packageJsonLocation
  );
  await insertPackageJson(repoRoot, packageJsonContents, targetPackagePath, targetPackage.packageName, versionType);
  await insertTsConfigJson(targetPackagePath);
  if (dryRun) {
    console.log("Dry run only, no changes");
    return;
  }
  await replaceSourceReferences(targetPackagePath, targetPackage.packageName);
  await insertMochaReporter(targetPackagePath, repoRoot);
  outputTestPath(targetPackage.projectFolder, sourceDir);
}
main(argv);
