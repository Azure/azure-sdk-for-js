/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { execSync } from "child_process";
import * as fssync from "fs";
import { promises as fs } from "fs";
import * as path from "path";
import { getChildFolderPaths, fileExistsSync, joinPath, readPackageJsonFileSync, PackageJson, getName } from '@ts-common/azure-js-dev-tools';

export function arrayContains<T>(array: T[], el: T): boolean {
  return array.indexOf(el) != -1
}

export async function isDirectory(directoryPath: string): Promise<boolean> {
  try {
    const stats = await fs.lstat(directoryPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

export async function pathExists(path: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    fssync.exists(path, exists => {
      resolve(exists);
    });
  });
}

export function startsWith(value: string, prefix: string): boolean {
  return !!(value && prefix && value.indexOf(prefix) === 0);
}

export function endsWith(value: string, suffix: string): boolean {
  return !!(value && suffix && value.length >= suffix.length && value.lastIndexOf(suffix) === value.length - suffix.length);
}

export function contains(values: string[], searchString: string): boolean {
  return arrayContains(values, searchString);
}

export function execute(command: string, packageFolderPath: string): void {
  if (fssync.existsSync(packageFolderPath)) {
    execSync(command, { cwd: packageFolderPath, stdio: "inherit" });
  }
}

export function npmRunBuild(packageFolderPath: string): void {
  execute("npm run build", packageFolderPath);
}

export function npmInstall(packageFolderPath: string): void {
  execute("npm install", packageFolderPath);
}

export async function getChildDirectories(parent: string): Promise<string[]> {
  const allChildren = await fs.readdir(parent);
  const childDirectories = [];

  for (const child of allChildren) {
    if (await isDirectory(path.resolve(parent, child))) {
      childDirectories.push(child);
    }
  }

  return childDirectories;
}

export function findAzureRestApiSpecsRepositoryPathSync(): string | undefined {
  const repositoryName = "azure-rest-api-specs";
  let currentDirectory = __dirname;
  const pathData = path.parse(currentDirectory);
  const rootDirectory = pathData.root;

  do {
    currentDirectory = path.resolve(currentDirectory, "..");

    if (containsDirectorySync(repositoryName, currentDirectory)) {
      return path.resolve(currentDirectory, repositoryName);
    }

  } while (currentDirectory != rootDirectory);

  return undefined;
}

function containsDirectorySync(directoryName: string, parentPath: string): boolean {
  return fssync.existsSync(path.resolve(parentPath, directoryName));
}

function isPackageFolderPath(folderPath: string, packagesToIgnore: string[]): boolean {
  let result = false;
  const packageJsonFilePath: string = joinPath(folderPath, "package.json");
  if (fileExistsSync(packageJsonFilePath)) {
    const packageJson: PackageJson = readPackageJsonFileSync(packageJsonFilePath);
    result = !contains(packagesToIgnore, packageJson.name!);
  }
  return result;
}

export const packagesToIgnore: string[] = [
  "@azure/event-hubs",
  "@azure/event-processor-host",
  "@azure/keyvault",
  "@azure/service-bus",
  "@azure/template"
];
export const folderNamesToIgnore: string[] = ["node_modules"];

export function getPackageFolderPaths(packagesFolderPath: string): string[] | undefined {
  return getChildFolderPaths(packagesFolderPath, {
    recursive: true,
    condition: (folderPath: string) => isPackageFolderPath(folderPath, packagesToIgnore),
    folderCondition: (folderPath: string) => !contains(folderNamesToIgnore, getName(folderPath))
  });
}
