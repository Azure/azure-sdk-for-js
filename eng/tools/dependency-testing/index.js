// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import process from "node:process";
import fs from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import semver from "semver";
import { getPackageSpec, readFileJson, writePackageJson } from "@azure-tools/eng-package-utils";
import { getConfig } from "@pnpm/config";
import { resolveFromCatalog } from "@pnpm/catalogs.resolver";

// crossSpawn is used because of its ability to better handle corner cases that break when using spawn in Windows environments.
// For more details see - https://www.npmjs.com/package/cross-spawn
import crossSpawn from "cross-spawn";

const argv = yargs(hideBin(process.argv))
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
 * the test:node command for the min-max tests.
 * This function basically does a string search for "timeout" / "test-timeout" / "hook-timeout" in the package's package.json
 * and replaces the command for timeout in new package.json in the test or test/public folder.
 * @param testPackageJson - the package.json that will be created in the test folder
 * @param packageJsonContents - the package's package.json contents
 */
async function usePackageTestTimeout(testPackageJson, packageJsonContents) {
  if (packageJsonContents.scripts["test:node"]) {
    // Replace any test-timeout
    let timeoutPattern = /--(test-)?timeout\s+(\d+)/;
    let replaceWithTimeout = packageJsonContents.scripts["test:node"].match(timeoutPattern);
    if (replaceWithTimeout !== null) {
      const timeoutArgument = `${replaceWithTimeout[1] || ""}timeout`;
      const packageTimeout = replaceWithTimeout[2];
      testPackageJson.scripts["test:node"] = testPackageJson.scripts["test:node"].replace(
        timeoutPattern,
        `--${timeoutArgument} ${packageTimeout}`,
      );
    }

    // Replace any hook-timeout
    timeoutPattern = /--hook-timeout\s+(\d+)/; // this is only a vitest concept, so there's just one pattern
    replaceWithTimeout = packageJsonContents.scripts["test:node"].match(timeoutPattern);
    if (replaceWithTimeout !== null) {
      const packageTimeout = replaceWithTimeout[1];
      testPackageJson.scripts["test:node"] = testPackageJson.scripts["test:node"].replace(
        timeoutPattern,
        `--hook-timeout ${packageTimeout}`,
      );
    }
  }
}

/**
 * This inserts the package.json from the templates into the test folder.
 * It computes the different versions of the dependencies/ dev-dep in this package.json
 * depending on the type of version testing being done.
 * @param {*} normalizedRoot  - root of the repository given as input
 * @param {*} packageJsonContents - the package's package.json contents
 * @param {*} targetPackagePath - path for the package for which the min/max testing is being run
 * @param {*} targetPackageName - name of the package for which the min/max testing is being run
 * @param {*} versionType - min or max or same
 * @param {*} testFolder - this is the test folder path from the package which is either test or test/public
 * @param {*} catalogs - pnpm catalogs configuration
 * @returns
 */
async function insertPackageJson(
  normalizedRoot,
  packageJsonContents,
  targetPackagePath,
  targetPackageName,
  versionType,
  testFolder,
  catalogs,
) {
  const testPath = path.join(targetPackagePath, testFolder);
  const testPackageJson = await readFileJson("./templates/package.json");
  if (packageJsonContents.name.startsWith("@azure/")) {
    testPackageJson.name = packageJsonContents.name.replace("@azure/", "azure-") + "-test";
  } else if (packageJsonContents.name.startsWith("@azure-rest/")) {
    testPackageJson.name =
      packageJsonContents.name.replace("@azure-rest/", "azure-rest-") + "-test";
  }
  testPackageJson.type = packageJsonContents.type;
  await usePackageTestTimeout(testPackageJson, packageJsonContents);

  testPackageJson.devDependencies = {};
  const depList = {};
  let allowedVersionList = {};
  depList[targetPackageName] = packageJsonContents.version; //works
  allowedVersionList[targetPackageName] = depList[targetPackageName];
  for (const pkg of Object.keys(packageJsonContents.dependencies)) {
    depList[pkg] = packageJsonContents.dependencies[pkg];
    depList[pkg] = await findAppropriateVersion(
      pkg,
      packageJsonContents.dependencies[pkg],
      normalizedRoot,
      versionType,
      catalogs,
    );
    if (packageJsonContents.dependencies[pkg] !== depList[pkg]) {
      console.log(pkg);
      allowedVersionList[pkg] = depList[pkg];
      console.log(allowedVersionList[pkg]);
    }
  }
  testPackageJson.dependencies = depList;

  for (const pkg of Object.keys(packageJsonContents.devDependencies)) {
    testPackageJson.devDependencies[pkg] = packageJsonContents.devDependencies[pkg];
    if (pkg.startsWith("@azure/") || pkg.startsWith("@azure-rest/")) {
      console.log(
        "packagejson version before func call = " + packageJsonContents.devDependencies[pkg],
      );
      let packageVersion = packageJsonContents.devDependencies[pkg];
      testPackageJson.devDependencies[pkg] = await findAppropriateVersion(
        pkg,
        packageVersion,
        normalizedRoot,
        versionType,
        catalogs,
      );
      console.log("packagejson version = " + packageJsonContents.devDependencies[pkg]);
      if (packageJsonContents.devDependencies[pkg] !== testPackageJson.devDependencies[pkg]) {
        console.log(pkg);
        allowedVersionList[pkg] = testPackageJson.devDependencies[pkg];
        console.log(allowedVersionList[pkg]);
      }
    }
  }
  const testPackageJsonPath = path.join(testPath, "package.json");
  await writePackageJson(testPackageJsonPath, testPackageJson);
  console.log(allowedVersionList);
  return allowedVersionList;
}

/**
 * Verifies if a package is a utility or not. We don't want to run min-max testing for utilities
 * @param {*} pkg - the package that you want to verify
 * @param {*} normalizedRoot - root of the repository given as input
 * @returns {Promise<boolean>}- true or false
 */
async function isPackageAUtility(pkg, normalizedRoot) {
  let thisPackage = await getPackageFromPnpm(normalizedRoot, pkg);
  if (thisPackage && thisPackage.versionPolicyName === "utility") {
    console.log(`${thisPackage.packageName} utility`);
    return true;
  }
  return false;
}

/**
 * This is the main heart of the min-max testing.
 * Decides the appropriate versions to be pinned of the dependencies or dev-dep in the package.json
 * @param {*} pkg - the package which is a dependency or dev-dependency of the targetPackage. We want to decide what version this package should be pinned to.
 * @param {*} packageJsonDepVersion - the dependency version range of the {package} in the targetPackage's package.json
 * @param {*} normalizedRoot - root of the repository given as input
 * @param {*} versionType - min or max or same
 * @param {*} catalogs - pnpm catalogs configuration
 * @returns
 */
async function findAppropriateVersion(
  pkg,
  packageJsonDepVersion,
  normalizedRoot,
  versionType,
  catalogs,
) {
  console.log("checking " + pkg + " = " + packageJsonDepVersion);
  let isUtility = await isPackageAUtility(pkg, normalizedRoot);
  if (isUtility) {
    return packageJsonDepVersion;
  }

  // Resolve catalog version specifiers to actual version ranges
  let resolvedVersionRange = packageJsonDepVersion;
  if (packageJsonDepVersion.startsWith("catalog:")) {
    const resolvedVersion = resolveFromCatalog(catalogs, {
      alias: pkg,
      bareSpecifier: packageJsonDepVersion,
    });
    if (resolvedVersion.type === "found") {
      resolvedVersionRange = resolvedVersion.resolution.specifier;
      console.log(`resolved catalog version: ${packageJsonDepVersion} -> ${resolvedVersionRange}`);
    } else {
      console.warn(
        `Failed to resolve catalog version for package ${pkg} with version ${packageJsonDepVersion}. Using local version.`,
      );
      let version = await getPackageVersion(normalizedRoot, pkg);
      console.log(version);
      return version;
    }
  }

  let allNPMVersionsString = await getVersions(pkg);
  if (allNPMVersionsString) {
    let allVersions = JSON.parse(allNPMVersionsString);
    if (typeof allVersions === "string") {
      allVersions = [allVersions];
    }
    console.log(versionType);
    if (versionType === "min") {
      let minVersion = await semver.minSatisfying(allVersions, resolvedVersionRange);
      if (minVersion) {
        return minVersion;
      } else {
        //issue a warning
        console.warn(
          `No matching semver min version found on npm for package ${pkg} with version ${resolvedVersionRange}. Replacing with local version`,
        );
        let version = await getPackageVersion(normalizedRoot, pkg);
        console.log(version);
        return version;
      }
    } else if (versionType === "max") {
      console.log("calling semver max satisfying");
      let maxVersion = await semver.maxSatisfying(allVersions, resolvedVersionRange);
      if (maxVersion) {
        return maxVersion;
      } else {
        //issue a warning
        console.warn(
          `No matching semver max version found on npm for package ${pkg} with version ${resolvedVersionRange}. Replacing with local version`,
        );
        let version = await getPackageVersion(normalizedRoot, pkg);
        console.log(version);
        return version;
      }
    } else if (versionType === "same") {
      return resolvedVersionRange;
    }
  }
}

async function getPackageVersion(normalizedRoot, pkg) {
  let thisPackage = await getPackageFromPnpm(normalizedRoot, pkg);
  if (!thisPackage) {
    throw new Error(`Package is not found in pnpm workspace for artifact ${pkg}`);
  }
  console.log(thisPackage);
  let thisPackagePath = path.join(normalizedRoot, thisPackage.projectFolder);
  let thisPackageJsonPath = path.join(thisPackagePath, "package.json");
  let thisPackageJsonContents = await readFileJson(thisPackageJsonPath);
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

function copyRepoFile(normalizedRoot, relativePath, fileName, targetPackagePath, testFolder) {
  const testPath = path.join(targetPackagePath, testFolder);
  const sourcePath = path.join(normalizedRoot, relativePath, fileName);
  const destPath = path.join(testPath, fileName);
  console.log(`copying file from ${sourcePath} to ${destPath}`);
  fs.copyFileSync(sourcePath, destPath);
}

function copyVitestConfig(targetPackagePath, testFolder) {
  const testPath = path.join(targetPackagePath, testFolder);
  let vitestConfig = fs.readFileSync("./templates/vitest.dependency-test.config.ts");

  const vitestConfigPath = path.join(testPath, "vitest.dependency-test.config.ts");
  fs.writeFileSync(vitestConfigPath, vitestConfig);
}

async function insertTsConfigJson(targetPackagePath, testFolder) {
  const testPath = path.join(targetPackagePath, testFolder);
  let tsConfigJson = await readFileJson("./templates/tsconfig.json");

  const tsConfigPath = path.join(testPath, "tsconfig.json");
  await writePackageJson(tsConfigPath, tsConfigJson);
}

async function readAndReplaceSourceReferences(filePath, packageName) {
  const fileContent = await readFile(filePath, { encoding: "utf8" });
  console.log("Reading filePath = " + filePath);
  const testAssetsContent = fileContent.replace(
    'path.resolve(path.join(process.cwd(), "assets"',
    'path.resolve(path.join(process.cwd(),"..","..", "assets"',
  );
  // Regex for internal references = /* ["']+[../]*src[/][a-z]+["'] */
  const internalrefs = testAssetsContent.match(/[\"\']+[..//]*src[//][a-zA-Z/]+[\"\']+/g);
  let writeContent = "";
  if (internalrefs) {
    console.log("internal refs = ");
    console.log(internalrefs);
    console.log("This file has internal references will be replaced by empty content");
  } else {
    const replaceText = '"' + packageName + '"';
    //Regex for public api references to be replaced by package name
    writeContent = testAssetsContent.replace(/[\"\']+[..//]*src[//]*[\"\']+/g, replaceText);
  }
  await writeFile(filePath, writeContent);
}

async function replaceSourceReferences(targetPackagePath, packageName, testFolder) {
  const testPath = path.join(targetPackagePath, testFolder);
  const resList = fromDir(testPath, ".ts", []);
  console.dir(resList);
  const resPromises = [];
  for (const eachFile of resList) {
    resPromises.push(readAndReplaceSourceReferences(eachFile, packageName));
  }
  await Promise.all(resPromises);
}

async function getVersions(packageName) {
  const promise = new Promise(async (res, rej) => {
    const npmProcess = crossSpawn("npm", ["view", packageName, "versions", "--json"], {
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

let results = undefined;

async function getPackageFromPnpm(normalizedRoot, packageName) {
  if (results === undefined) {
    const listPackagesCommandExec = new Promise(async (res, rej) => {
      const pnpmProcess = crossSpawn(
        "pnpm",
        ["list", "--recursive", "--json", "--depth=-1"],
        {
          stdout: "inherit",
          cwd: normalizedRoot,
        },
      );
      let stdOut = "";
      let stdErr = "";
      pnpmProcess.stdout.on("data", (data) => (stdOut = stdOut + data.toString()));
      pnpmProcess.stderr.on("data", (data) => (stdErr = stdErr + data.toString()));
      pnpmProcess.on("close", (code) => {
        console.log(`pnpm list --recursive --json --depth=-1 process exit code: ${code}`);
        if (code !== 0) {
          rej(`Process exits with code ${code}`);
          return;
        }
        res({ code, stdOut, stdErr });
      });
    });

    const listPackagesCommand = await listPackagesCommandExec;
    const pnpmPackages = JSON.parse(listPackagesCommand.stdOut);
    const projects = [];

    for (const pkg of pnpmPackages) {
      if (pkg.path.startsWith(normalizedRoot)) {
        const projectFolder = pkg.path.slice(normalizedRoot.length);
        const packageJsonPath = path.join(pkg.path, "package.json");
        const packageJson = JSON.parse(await readFile(packageJsonPath, "utf-8"));
        projects.push({
          packageName: pkg.name,
          projectFolder,
          versionPolicyName: packageJson["sdk-type"] || "unknown",
        });
      }
    }
    results = { projects };
  }

  return results.projects.find((project) => project.packageName === packageName);
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
  const normalizedRoot = path.normalize(path.join(process.cwd(), repoRoot));
  console.dir({
    artifactName,
    repoRoot,
    normalizedRoot,
    versionType,
    sourceDir,
    testFolder,
    dryRun,
  });

  // Load pnpm catalogs configuration
  const { config } = await getConfig({
    cliOptions: {},
    packageManager: {
      name: "pnpm",
      version: "10.0.0",
    },
    workspaceDir: normalizedRoot,
  });

  const targetPackage = await getPackageFromPnpm(normalizedRoot, packageName);
  if (!targetPackage) {
    throw new Error(`Package is not found in pnpm workspace for artifact ${artifactName}`);
  }
  const targetPackagePath = path.join(normalizedRoot, targetPackage.projectFolder);

  const packageJsonLocation = path.join(targetPackagePath, "package.json");

  const packageJsonContents = await readFileJson(packageJsonLocation);
  await insertPackageJson(
    repoRoot,
    packageJsonContents,
    targetPackagePath,
    targetPackage.packageName,
    versionType,
    testFolder,
    config.catalogs,
  );
  await insertTsConfigJson(targetPackagePath, testFolder);
  if (packageJsonContents.scripts["test:node"].includes("vitest")) {
    copyVitestConfig(targetPackagePath, testFolder);
  }
  if (dryRun) {
    console.log("Dry run only, no changes");
    return;
  }
  await replaceSourceReferences(targetPackagePath, targetPackage.packageName, testFolder);
  outputTestPath(targetPackage.projectFolder, sourceDir, testFolder);
}
main(argv);
