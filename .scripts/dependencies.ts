import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

export interface PackageFolder {
  folderPath: string;
  extraFilePaths?: string[];
}

function log(filePath: string, message: string): void {
  console.log(`[${filePath}] - ${message}`);
}

/**
 * Get whether or not the node_modules folder should be refreshed based on the command line
 * arguments.
 * @param argv The command line arguments that were provided.
 * @returns Whether or not the node_modules folder should be refreshed.
 */
export function shouldForceRefresh(argv: string[]): boolean {
  let result = false;
  if (argv) {
    for (const arg of argv) {
      const argLower: string = arg && arg.toLocaleLowerCase();
      if (argLower === "-f" || argLower === "-force" || argLower === "--force") {
        result = true;
        break;
      }
    }
  }
  return result;
}

export function resolvePath(...paths: string[]): string {
  return path.resolve(...paths).split("\\").join("/");
}

function exists(path: string): boolean {
  return fs.existsSync(path);
}

/**
 * Delete the file at the provided file path.
 * @param {string} filePath The path to the file to delete.
 */
function deleteFile(filePath: string): void {
  fs.unlinkSync(filePath);
}

/**
 * Delete the folder at the provided folder path.
 * @param {string} folderPath The path to the folder to delete.
 */
function deleteFolder(folderPath: string): void {
  try {
    fs.rmdirSync(folderPath);
  } catch (error) {
    if (error.code === "ENOTEMPTY") {
      const folderEntryPaths: string[] = fs.readdirSync(folderPath);
      for (const entryName of folderEntryPaths) {
        const entryPath: string = resolvePath(folderPath, entryName);
        const entryStats: fs.Stats = fs.lstatSync(entryPath);
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
function readTextFileContents(filePath: string): string {
  return fs.readFileSync(filePath, { encoding: "utf8" });
}

/**
 * Execute the provided command on the shell synchronously.
 * @param {string} command The command to execute.
 * @param {string} workingDirectory The working directory to execute the command in.
 * @returns {void}
 */
function execute(command: string, workingDirectory: string): void {
  log(workingDirectory, `Running "${command}"...`);
  execSync(command, { cwd: workingDirectory, stdio: [0, 1, 2] });
}

/**
 * Get the absolute path to this repository's folder path.
 * @returns {string} The absolute path to this repository's folder path.
 */
export function getThisRepositoryFolderPath(): string {
  return resolvePath(__dirname, "..");
}

/**
 * Get the absolute path to the package.json in this repository.
 * @returns {string} The absolute path to the package.json.
 */
function getPackageJsonFilePath(packageFolder: string): string {
  return resolvePath(packageFolder, "package.json");
}

/**
 * Get the absolute path to the local clone of the repository with the provided name.
 * @param {string} repoName The name of the repository.
 * @returns {string} The absolute path to the local clone of the repository.
 */
export function getLocalRepositoryPath(repoName: string): string {
  return resolvePath(getThisRepositoryFolderPath(), "..", repoName);
}

/**
 * Get the package.json file contents parsed as a JSON object.
 * @param {string=} packageJsonFilePath The path to the package.json file to read. If this is not
 * provided, then the package.json file at the root of this repository will be used.
 * @returns {{}} The parsed package.json file contents.
 */
function getPackageJson(packageJsonFilePath: string): any {
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
function getClonedRepositories(dependencies?: { [packageName: string]: string }): string[] {
  const clonedRepositoryNames: string[] = [];
  if (dependencies) {
    for (const dependencyName in dependencies) {
      if (clonedRepositoryNames.indexOf(dependencyName) === -1) {
        const repoFolderPath = getLocalRepositoryPath(dependencyName);
        if (exists(repoFolderPath)) {
          clonedRepositoryNames.push(dependencyName);
        }
      }
    }
  }
  return clonedRepositoryNames;
}

/**
 * Run a script with the provided name in the local clone of the repository with the provided name.
 * @param {string} repoName The name of the repository to run the script in.
 * @param {string} scriptName The name of the script to run in the local repository.
 * @returns {void}
 */
export function runLocalRepositoryNPMScript(repoName: string, scriptName: string): void {
  const repoFolderPath: string = getLocalRepositoryPath(repoName);
  const packageJsonFilePath: string = getPackageJsonFilePath(repoFolderPath);
  const packageJson: any = getPackageJson(packageJsonFilePath);
  const repoScripts: any = packageJson.scripts;
  if (repoScripts && repoScripts[scriptName]) {
    execute(`npm run ${scriptName}`, repoFolderPath);
  } else {
    log(packageJsonFilePath, `No script named "${scriptName}" is defined.`);
  }
}

/**
 * Get the npm package version of the package with the provided name at the provided tag.
 * @param {string} packageName The name of the package.
 * @param {string} tag The tag of the version to retrieve.
 * @returns {string?} The version of the provided package at the provided tag.
 */
export function getNpmPackageVersion(packageName: string, tag: string): string | undefined {
  const npmViewResult: any = JSON.parse(execSync(`npm view ${packageName} --json`, { stdio: ["pipe", "pipe", "ignore"] }).toString());
  return npmViewResult["dist-tags"][tag];
}

/**
 * Update the package.json property values for "main".
 * @param {string} mainValue The value that will be used for "main".
 * @returns {void}
 */
export function updatePackageJsonMain(packageFolderPath: string, mainValue: string): void {
  const packageJsonFilePath: string = getPackageJsonFilePath(packageFolderPath);

  const packageJson: any = getPackageJson(packageJsonFilePath);

  if (packageJson.main === mainValue) {
    log(packageJsonFilePath, `"main" is already set to "${mainValue}".`);
  } else {
    log(packageJsonFilePath, `Changing "main" to "${mainValue}".`);
    packageJson.main = mainValue;

    writePackageJson(packageJson, packageJsonFilePath);
  }
}

/**
 * Update the dependency versions in the files at the provided codeFilePaths.
 * @param {string[]} codeFilePath The paths to the code files that should be updated.
 * @param {string} dependencyName The name of the dependency to update.
 * @param {RegExp} regularExpression The regular expression to use to find the dependency name and
 * version in the code file's contents.
 * @param {string} newValue The replacement string that will replace the text that matches the
 * provided regularExpression.
 * @param {string} newDependencyVersion The version of the dependency to set in the provided code
 * files.
 */
function updateGeneratedPackageDependencyVersion(codeFilePath: string, dependencyName: string, newDependencyVersion: string): boolean {
  let fileChanged = false;
  codeFilePath = resolvePath(codeFilePath);
  if (exists(codeFilePath)) {
    const originalCodeFileContents: string = readTextFileContents(codeFilePath);
    let codeFileContents: string = originalCodeFileContents;

    codeFileContents = regularExpressionReplace(
      codeFilePath,
      codeFileContents,
      dependencyName,
      new RegExp(`\\\\"${dependencyName}\\\\": \\\\"(.*)\\\\"`),
      `\\"${dependencyName}\\": \\"${newDependencyVersion}\\"`,
      newDependencyVersion);

    codeFileContents = regularExpressionReplace(
      codeFilePath,
      codeFileContents,
      dependencyName,
      new RegExp(`"${dependencyName}": "(.*)"`),
      `"${dependencyName}": "${newDependencyVersion}"`,
      newDependencyVersion);

    if (codeFileContents !== originalCodeFileContents) {
      fileChanged = true;
      fs.writeFileSync(codeFilePath, codeFileContents);
    }
  }
  return fileChanged;
}

function regularExpressionReplace(filePath: string, fileContents: string, dependencyName: string, regularExpression: RegExp, newValue: string, newDependencyVersion: string): string {
  let newFileContents: string = fileContents;
  const match: RegExpMatchArray | null = fileContents.match(regularExpression);
  if (match) {
    if (match[1] === newDependencyVersion) {
      log(filePath, `"${dependencyName}" is already set to "${newDependencyVersion}".`);
    } else {
      log(filePath, `Changing "${dependencyName}" version from "${match[1]}" to "${newDependencyVersion}".`);
      newFileContents = fileContents.replace(regularExpression, newValue);
    }
  }
  return newFileContents;
}

/**
 * Write the provided packageJSON object to the file at the provided packageJsonFilePath.
 * @param {any} packageJson The package json object to write.
 * @param {string} packageJsonFilePath The path to the package.json file.
 * @returns {void}
 */
function writePackageJson(packageJson: any, packageJsonFilePath: string): void {
  fs.writeFileSync(packageJsonFilePath, JSON.stringify(packageJson, undefined, "  ") + "\n");
}

export function updateLocalDependencies(packageFolders: PackageFolder[], localDependencyNPMScript: string, getNewDependencyVersion: (dependencyName: string) => string | undefined): void {
  const forceRefresh: boolean = shouldForceRefresh(process.argv);

  for (const packageFolder of packageFolders) {
    const packageFolderPath: string = packageFolder.folderPath;

    let refreshPackageFolder: boolean = forceRefresh;

    const packageJson: any = getPackageJson(resolvePath(packageFolderPath, "package.json"));

    const localDependencies: string[] = getClonedRepositories(packageJson.dependencies);
    const localDevDependencies: string[] = getClonedRepositories(packageJson.devDependencies);

    const allLocalDependencies: string[] = localDependencies.concat(localDevDependencies);

    for (const localDependency of allLocalDependencies) {
      runLocalRepositoryNPMScript(localDependency, localDependencyNPMScript);
    }

    for (const localDependency of allLocalDependencies) {
      if (updateLocalDependency(packageFolder, localDependency, getNewDependencyVersion)) {
        refreshPackageFolder = true;
      }
    }

    if (refreshPackageFolder) {
      const packageLockFilePath = resolvePath(packageFolderPath, "package-lock.json");
      if (exists(packageLockFilePath)) {
        log(packageLockFilePath, `Deleting...`);
        deleteFile(packageLockFilePath);
      }

      const nodeModulesFolderPath = resolvePath(packageFolderPath, "node_modules");
      if (exists(nodeModulesFolderPath)) {
        log(nodeModulesFolderPath, `Deleting...`);
        deleteFolder(nodeModulesFolderPath);
      }

      execute("npm install", packageFolderPath);
    }
  }
}

function updateLocalDependency(packageFolder: PackageFolder, dependencyName: string, getNewDependencyVersion: (dependencyName: string) => string | undefined): boolean {
  const newDependencyVersion: string = getNewDependencyVersion(dependencyName) || "";

  const packageFolderPath: string = packageFolder.folderPath;

  const localDependencyUpdated = updateGeneratedPackageDependencyVersion(
    resolvePath(packageFolderPath, "package.json"),
    dependencyName,
    newDependencyVersion);

  updateGeneratedPackageDependencyVersion(
    resolvePath(packageFolderPath, "README.md"),
    dependencyName,
    newDependencyVersion);

  if (packageFolder.extraFilePaths) {
    for (const extraFilePath of packageFolder.extraFilePaths) {
      updateGeneratedPackageDependencyVersion(
        resolvePath(packageFolderPath, extraFilePath),
        dependencyName,
        newDependencyVersion);
    }
  }

  return localDependencyUpdated;
}

export function getLocalDependencyVersion(dependencyName: string): string {
  return `file:${getLocalRepositoryPath(dependencyName)}`;
}

export function getPreviewDependencyVersion(dependencyName: string): string | undefined {
  let version: string | undefined = addTildePrefix(getNpmPackageVersion(dependencyName, "preview"));
  if (!version) {
    version = getLatestDependencyVersion(dependencyName);
  }
  return version;
}

export function getLatestDependencyVersion(dependencyName: string): string | undefined {
  return addTildePrefix(getNpmPackageVersion(dependencyName, "latest"));
}

function addTildePrefix(version: string | undefined): string | undefined {
  return version ? `~${version}` : version;
}