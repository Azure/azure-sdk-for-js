const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * Get the absolute path to the package.json in this repository.
 * @returns {string} The absolute path to the package.json.
 */
function getPackageJsonFilePath() {
  return path.resolve(__dirname, "../package.json");
}

/**
 * Get the package.json file contents parsed as a JSON object.
 * @param {string=} packageJsonFilePath The path to the package.json file to read. If this is not
 * provided, then the package.json file at the root of this repository will be used.
 * @returns {{}} The parsed package.json file contents.
 */
function getPackageJson(packageJsonFilePath) {
  if (!packageJsonFilePath) {
    packageJsonFilePath = getPackageJsonFilePath();
  }
  return JSON.parse(fs.readFileSync(packageJsonFilePath));
}

/**
 * Get the dependencies from the provided dependencies dictionary that have local clones.
 * @param {{ [packageName: string]: string }} dependencies A dictionary of package names to package
 * versions.
 * @param {string[]} clonedRepositoryNames The array to put the names of the local cloned
 * repositories into.
 * @returns {void}
 */
function getClonedRepositories(dependencies, clonedRepositoryNames) {
  if (clonedRepositoryNames && dependencies) {
    for (const dependencyName in dependencies) {
      if (clonedRepositoryNames.indexOf(dependencyName) === -1) {
        const repoFolderPath = path.resolve(__dirname, "..", "..", dependencyName);
        if (fs.existsSync(repoFolderPath)) {
          clonedRepositoryNames.push(dependencyName);
        }
      }
    }
  }
}

/**
 * Get the names of the dependencies of this repository that have local clones.
 * @returns {string[]} The names of the dependencies of this repository that have local clones.
 */
function getDependenciesWithClonedRepositories() {
  const clonedRepositoryNames = [];

  const packageJson = getPackageJson();

  getClonedRepositories(packageJson.dependencies, clonedRepositoryNames);
  getClonedRepositories(packageJson.devDependencies, clonedRepositoryNames);

  return clonedRepositoryNames;
}
exports.getDependenciesWithClonedRepositories = getDependenciesWithClonedRepositories;

/**
 * Update this repository's package.json file's dependency version with the provided name to the
 * provided version. If the dependency version in the package.json file changes, then "npm install"
 * will be run for the changed dependency.
 * @param {string} dependencyName The name of the dependency to update.
 * @param {string} dependencyVersion The version to update the dependency to.
 * @returns {void}
 */
function updatePackageJsonDependency(dependencyName, dependencyVersion) {
  const packageJsonFilePath = getPackageJsonFilePath();

  const packageJson = getPackageJson(packageJsonFilePath);
  if (packageJson.dependencies[dependencyName] == dependencyVersion) {
    console.log(`"${dependencyName}" is already set to "${dependencyVersion}".`);
  } else {
    console.log(`Changing "${dependencyName}" to "${dependencyVersion}"`)
    packageJson.dependencies[dependencyName] = dependencyVersion;

    fs.writeFileSync(packageJsonFilePath, JSON.stringify(packageJson, undefined, "  "));

    const npmInstallCommand = `npm install ${dependencyName}`;
    console.log(npmInstallCommand);
    execSync(npmInstallCommand, {stdio:[0,1,2]});
  }
}
exports.updatePackageJsonDependency = updatePackageJsonDependency;

/**
 * Get the npm package version of the package with the provided name at the provided tag.
 * @param {string} packageName The name of the package.
 * @param {string} tag The tag of the version to retrieve.
 * @returns {string?} The version of the provided package at the provided tag.
 */
function getNpmPackageVersion(packageName, tag) {
  const npmViewResult = JSON.parse(execSync(`npm view ${packageName} --json`, { stdio: ['pipe', 'pipe', 'ignore'] }));
  return npmViewResult['dist-tags'][tag];
}
exports.getNpmPackageVersion = getNpmPackageVersion;