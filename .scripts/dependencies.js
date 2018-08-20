const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * Get whether or not the node_modules folder should be refreshed based on the command line
 * arguments.
 * @param {string} argv The command line arguments that were provided.
 * @returns {boolean} Whether or not the node_modules folder should be refreshed.
 */
function shouldForceRefresh(argv) {
  let result = false;
  if (argv) {
    for (const arg of argv) {
      const argLower = arg && arg.toLocaleLowerCase();
      if (argLower === "-f" || argLower === "-force" || argLower === "--force") {
        result = true;
        break;
      }
    }
  }
  return result;
}
exports.shouldForceRefresh = shouldForceRefresh;

/**
 * Replace all of the instances of searchValue in text with replaceValue.
 * @param {string} text The text to search and replace in.
 * @param {string} searchValue The value to search for in text.
 * @param {string} replaceValue The value to replace searchValue with in text.
 * @returns {string} The value of text after all of the instances of searchValue have been replaced
 * by replaceValue.
 */
function replaceAll(text, searchValue, replaceValue) {
  return text.split(searchValue).join(replaceValue);
}

/**
 * Normalize the provided path by ensuring that all path separators are forward slashes ('/').
 * @param {string} pathString The path to normalize.
 * @returns {string} The normalized path.
 */
function normalizePath(pathString) {
  return replaceAll(pathString, "\\", "/")
}

/**
 * Delete the file at the provided file path.
 * @param {string} filePath The path to the file to delete.
 */
function deleteFile(filePath) {
  fs.unlinkSync(filePath);
}

/**
 * Delete the folder at the provided folder path.
 * @param {string} folderPath The path to the folder to delete.
 */
function deleteFolder(folderPath) {
  try {
    fs.rmdirSync(folderPath);
  } catch (error) {
    if (error.code === "ENOTEMPTY") {
      const folderEntryPaths = fs.readdirSync(folderPath);
      for (const entryName of folderEntryPaths) {
        const entryPath = normalizePath(path.resolve(folderPath, entryName));
        const entryStats = fs.lstatSync(entryPath);
        if (entryStats.isDirectory()) {
          deleteFolder(entryPath);
        } else {
          deleteFile(entryPath);
        }
      }
      fs.rmdirSync(folderPath);
    } else {
      throw error;
    }
  }
}

/**
 * Read the contents of text file at the provided filePath.
 * @param {string} filePath The path to the text file to read.
 * @returns {string} The text contents of the text file at the provided filePath.
 */
function readTextFileContents(filePath) {
  return fs.readFileSync(filePath, { encoding: "utf8" });
}

/**
 * Execute the provided command on the shell synchronously.
 * @param {string} command The command to execute.
 * @param {string} workingDirectory The working directory to execute the command in.
 * @returns {void}
 */
function execute(command, workingDirectory) {
  console.log(`Running "${command}" in "${workingDirectory}"...`);
  execSync(command, { cwd: workingDirectory, stdio: [0, 1, 2] });
}

/**
 * Get the absolute path to this repository's folder path.
 * @returns {string} The absolute path to this repository's folder path.
 */
function getThisRepositoryFolderPath() {
  return normalizePath(path.resolve(__dirname, ".."));
}

/**
 * Get the absolute path to the package.json in this repository.
 * @returns {string} The absolute path to the package.json.
 */
function getPackageJsonFilePath() {
  return normalizePath(path.resolve(__dirname, "../package.json"));
}

/**
 * Get the absolute path to the local clone of the repository with the provided name.
 * @param {string} repoName The name of the repository.
 * @returns {string} The absolute path to the local clone of the repository.
 */
function getLocalRepositoryPath(repoName) {
  return normalizePath(path.resolve(__dirname, "..", "..", repoName));
}
exports.getLocalRepositoryPath = getLocalRepositoryPath;

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
  return JSON.parse(readTextFileContents(packageJsonFilePath));
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
        const repoFolderPath = getLocalRepositoryPath(dependencyName);
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
 * Run a script with the provided name in the local clone of the repository with the provided name.
 * @param {string} repoName The name of the repository to run the script in.
 * @param {string} scriptName The name of the script to run in the local repository.
 * @returns {void}
 */
function runLocalRepositoryNPMScript(repoName, scriptName) {
  const repoFolderPath = getLocalRepositoryPath(repoName);
  const packageJsonFilePath = path.join(repoFolderPath, "package.json");
  const packageJson = getPackageJson(packageJsonFilePath);
  const repoScripts = packageJson.scripts;
  if (repoScripts && repoScripts[scriptName]) {
    execute(`npm run ${scriptName}`, repoFolderPath);
  } else {
    console.log(`No script named "${scriptName}" is specified in "${packageJsonFilePath}".`);
  }
}
exports.runLocalRepositoryNPMScript = runLocalRepositoryNPMScript;

/**
 * Update this repository's package.json file's dependency version with the provided name to the
 * provided version. If the dependency version in the package.json file changes, then "npm install"
 * will be run for the changed dependency.
 * @param {string} dependencyName The name of the dependency to update.
 * @param {string} dependencyVersion The version to update the dependency to.
 * @returns {boolean} Whether or not the dependency changed.
 */
function updatePackageJsonDependency(dependencyName, dependencyVersion) {
  let dependencyChanged = false;

  const packageJsonFilePath = getPackageJsonFilePath();

  const packageJson = getPackageJson(packageJsonFilePath);
  if (packageJson.dependencies[dependencyName] == dependencyVersion) {
    console.log(`"${dependencyName}" is already set to "${dependencyVersion}" in "${packageJsonFilePath}".`);
  } else {
    console.log(`Changing "${dependencyName}" to "${dependencyVersion}" in "${packageJsonFilePath}"`)
    packageJson.dependencies[dependencyName] = dependencyVersion;

    writePackageJson(packageJson, packageJsonFilePath);

    dependencyChanged = true;
  }

  return dependencyChanged;
}
exports.updatePackageJsonDependency = updatePackageJsonDependency;

/**
 * Run NPM install in this repository
 * @param {object} options
 * @param {boolean} options.ignoreScripts whether to ignore scripts in npm install (skips dotnet build)
 * @returns {void}
 */
function refreshNodeModules(options) {
  const thisRepositoryFolderPath = getThisRepositoryFolderPath();
  const nodeModulesFolderPath = normalizePath(path.resolve(thisRepositoryFolderPath, "node_modules"));
  if (fs.existsSync(nodeModulesFolderPath)) {

    const packageLockFilePath = normalizePath(path.resolve(thisRepositoryFolderPath, "package-lock.json"));
    if (fs.existsSync(packageLockFilePath)) {
      console.log(`Deleting "${packageLockFilePath}"...`);
      deleteFile(packageLockFilePath);
    }

    console.log(`Deleting "${nodeModulesFolderPath}"...`);
    deleteFolder(nodeModulesFolderPath);
  }
  const ignoreScripts = options && options.ignoreScripts;
  execute("npm install" + (ignoreScripts ? " --ignore-scripts" : ""), getThisRepositoryFolderPath());
}
exports.refreshNodeModules = refreshNodeModules;

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

/**
 * Update the package.json property values for "main".
 * @param {string} mainValue The value that will be used for "main".
 * @returns {void}
 */
function updatePackageJsonMain(mainValue) {
  const packageJsonFilePath = getPackageJsonFilePath();

  const packageJson = getPackageJson(packageJsonFilePath);

  if (packageJson.main == mainValue) {
    console.log(`"main" is already set to "${mainValue}" in "${packageJsonFilePath}".`);
  } else {
    console.log(`Changing "main" to "${mainValue}" in "${packageJsonFilePath}"`)
    packageJson.main = mainValue;

    writePackageJson(packageJson, packageJsonFilePath);
  }
}
exports.updatePackageJsonMain = updatePackageJsonMain;

/**
 * Write the provided packageJSON object to the file at the provided packageJsonFilePath.
 * @param {any} packageJson The package json object to write.
 * @param {string} packageJsonFilePath The path to the package.json file.
 * @returns {void}
 */
function writePackageJson(packageJson, packageJsonFilePath) {
  fs.writeFileSync(packageJsonFilePath, JSON.stringify(packageJson, undefined, "  ") + "\n");
}