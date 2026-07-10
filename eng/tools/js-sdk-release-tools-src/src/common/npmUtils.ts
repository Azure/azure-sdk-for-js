import pkg from '@npmcli/package-json';
const { load } = pkg;
import { NpmPackageInfo } from './types.js';
import * as fetch from 'npm-registry-fetch';
import { getApiReviewPath, getApiReviewBasePath } from './utils.js';
import shell from 'shelljs';
import { writeFile } from 'fs';
import path, { relative, join } from 'path';
import { logger } from '../utils/logger.js';
import { error } from 'console';
import fs from 'fs';

export async function getNpmPackageInfo(packageDirectory): Promise<NpmPackageInfo> {
  const packageJson = await load(packageDirectory);
  if (!packageJson.content.name) {
    throw new Error(`package.json doesn't contains name property`);
  }
  if (!packageJson.content.version) {
    throw new Error(`package.json doesn't contains version property`);
  }
  const name = packageJson.content.name;
  const version = packageJson.content.version;
  return { name, version };
}

export function getNpmPackageName(info: NpmPackageInfo) {
  if (info.name.startsWith('@azure-rest/')) {
    return info.name.replace('@azure-rest/', 'azure-rest-');
  } else if (info.name.startsWith('@azure/')) {
    return info.name.replace('@azure/', 'azure-');
  } else {
    return info.name;
  }
}

export function getNpmPackageSafeName(info: NpmPackageInfo) {
  const name = getNpmPackageName(info);
  const safeName = name.replace(/-/g, '');
  return safeName;
}

export function getArtifactName(info: NpmPackageInfo) {
  const name = getNpmPackageName(info);
  const version = info.version;
  return `${name}-${version}.tgz`;
}

export async function tryGetNpmView(packageName: string): Promise<{ [id: string]: unknown } | undefined> {
  try {
    return await fetch.json(`/${packageName}`);
  } catch (err) {
    return undefined;
  }
}

export interface NpmViewParameters {
  file: 'ApiView' | 'CHANGELOG.md';
  version: string;
  packageFolderPath: string;
  packageName: string;
  sdkRootPath: string;
  npmPackagePath: string;
}

function executeCommand(command: string, maxRetries = 3, retryDelayMs = 1000): shell.ShellString | null {
  const currentRepo = shell.pwd().stdout.trim();
  logger.info(`Executing git command in repo: ${currentRepo}`);
  logger.info(`Executing command with retry mode (max attempts: ${maxRetries}): ${command}`);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = shell.exec(command, { silent: true });
      if (result.code === 0) {
        return result;
      }
      logger.warn(`Command failed (attempt ${attempt}/${maxRetries}): ${command}`);
    } catch (err) {
      logger.warn(`Exception executing command (attempt ${attempt}/${maxRetries}): ${err}`);
    }

    if (attempt < maxRetries) {
      logger.info(`Retrying in ${retryDelayMs}ms...`);
      // Simple non-blocking sleep using shelljs
      shell.exec(
        process.platform === 'win32'
          ? `ping -n ${Math.ceil(retryDelayMs / 1000) + 1} 127.0.0.1 >nul`
          : `sleep ${retryDelayMs / 1000}`,
        { silent: true }
      );
    }
  }

  logger.warn(`Failed to execute command after ${maxRetries} attempts: ${command}`);
  return null;
}

/**
 * Check if a Git tag exists in the repository.
 * In the normal case, `git tag -l` prints matching tag names to stdout and prints nothing
 * when there is no match. If the command itself fails, Git may return a non-zero exit code,
 * so we check both for a successful exit code and non-empty output.
 * @param tag The Git tag to check
 * @returns boolean indicating if the tag exists
 */
export function checkGitTagExists(tag: string): boolean {
  const result = shell.exec(`git tag -l ${tag}`, { silent: true });
  return result.code === 0 && result.stdout.trim().length > 0;
}

// TODO: refactor this function to support praparing files from github in general way
export function tryCreateLastestStableNpmViewFromGithub(NpmViewParameters: NpmViewParameters) {
  const { file, version, packageFolderPath, packageName, sdkRootPath, npmPackagePath } = NpmViewParameters;
  let sdkFilePath = '';
  const targetFilePath = file === 'CHANGELOG.md' ? path.join(npmPackagePath, file) : getApiReviewPath(npmPackagePath);
  const tag = `${packageName}_${version}`;
  const defaultContent = '```ts\n```';
  logger.info(`Start to get and clone ${npmPackagePath} from latest ${packageName} release tag.`);

  try {
    if (file === 'CHANGELOG.md') {
      sdkFilePath = relative(sdkRootPath, path.join(packageFolderPath, file)).replace(/\\/g, '/');
      // For CHANGELOG.md, use sdkFilePath directly
      const gitCommand = `git --no-pager show ${tag}:${sdkFilePath}`;
      const changelogContent = executeCommand(gitCommand)?.stdout || '';
      if (!changelogContent.trim()) {
        logger.warn(`Warning: CHANGELOG.md content is empty for tag ${tag} at path ${sdkFilePath}.`);
      }
      fs.writeFileSync(targetFilePath, changelogContent, { encoding: 'utf-8' });
    } else {
      sdkFilePath = relative(sdkRootPath, getApiReviewBasePath(packageFolderPath)).replace(/\\/g, '/');
      // For API review files, generate two file paths with different suffixes
      const nodeApiFilePath = `${sdkFilePath}-node.api.md`;
      const standardApiFilePath = `${sdkFilePath}.api.md`;

      // Generate two git commands
      const nodeApiGitCommand = `git --no-pager show ${tag}:${nodeApiFilePath}`;
      const standardApiGitCommand = `git --no-pager show ${tag}:${standardApiFilePath}`;

      // Execute both git commands
      const nodeApiExecResult = executeCommand(nodeApiGitCommand)?.stdout || '';
      const standardApiExecResult = executeCommand(standardApiGitCommand)?.stdout || '';

      // Use nodeApi result if it has content, otherwise use standardApi result
      let apiViewContent = nodeApiExecResult.trim() ? nodeApiExecResult : standardApiExecResult;
      if (!apiViewContent.trim()) {
        logger.warn(
          `Warning: No API view content found for either ${nodeApiFilePath} or ${standardApiFilePath}. Using default content.`
        );
        apiViewContent = defaultContent;
      }
      fs.writeFileSync(targetFilePath, apiViewContent, { encoding: 'utf-8' });
    }
    logger.info(`Create ${packageFolderPath} from the tag ${tag} successfully`);
  } catch (error) {
    logger.error(
      `Failed to read ${packageFolderPath} in ${sdkFilePath} from the tag ${tag}.\n Error details: ${error}`
    );
  }
}

/**
 * Check if a directory exists in GitHub repository for a given package tag
 * @param packageRoot The local package root path
 * @param directoryPath The directory path to check (relative to package root)
 * @param packageName The npm package name
 * @param version The package version to check against
 * @returns Promise<boolean> indicating if the directory exists in GitHub
 */
export async function checkDirectoryExistsInGithub(
  packageRoot: string,
  directoryPath: string[],
  packageName: string,
  version: string
): Promise<boolean> {
  try {
    const tag = `${packageName}_${version}`;

    // Get SDK root path
    const sdkRootPath = process.cwd(); // Assuming we're running from SDK root

    // directoryPath is expected to be an array of candidate paths
    for (const dirPath of directoryPath) {
      const relativePath = relative(sdkRootPath, join(packageRoot, dirPath)).replace(/\\/g, '/');

      // Use git ls-tree to check if directory exists
      const gitCommand = `git ls-tree -d ${tag} ${relativePath}`;
      const result = executeCommand(gitCommand);

      if (result && result.code === 0 && result.stdout.trim()) {
        logger.info(`Directory ${dirPath} exists in GitHub tag ${tag} for package ${packageName}`);
        return true;
      }
    }

    // If none of the paths exist
    logger.info(
      `None of the directories [${directoryPath.join(', ')}] exist in GitHub tag ${tag} for package ${packageName}`
    );
    return false;
  } catch (error) {
    logger.error(`Error checking directory existence in GitHub: ${error}`);
    return false;
  }
}
