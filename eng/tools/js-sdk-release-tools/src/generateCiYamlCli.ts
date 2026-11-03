#!/usr/bin/env node

import commandLineArgs from "command-line-args";
import { createOrUpdateCiYaml } from "./common/ciYamlUtils.js";
import { getNpmPackageInfo } from "./common/npmUtils.js";
import { logger } from "./utils/logger.js";
import path from "path";

const generateCiYamlCli = async (
  sdkRepoPath: string | undefined,
  packageFolderPath: string | undefined,
) => {
  if (!sdkRepoPath || !packageFolderPath) {
    logger.error(`SdkRepoPath and PackagePath are required.`);
    logger.error(`Usage: generate-ci-yaml --sdkRepoPath <SdkRepoPath> --packagePath <PackagePath>`);
    process.exit(1);
  }

  // Calculate relative path from sdkRepoPath to packagePath
  const normalizedSdkRepoPath = path.resolve(sdkRepoPath);
  const absolutePackagePath = path.resolve(packageFolderPath);
  const relativePackagePath = path.relative(normalizedSdkRepoPath, absolutePackagePath);

  // Validate that the package path is safely inside the SDK repo path.
  // Reject obvious path traversal attempts such as absolute paths outside the repo
  // or relative paths that start with "..".
  const normalizedSdkRepoPathWithSep = normalizedSdkRepoPath.endsWith(path.sep)
    ? normalizedSdkRepoPath
    : normalizedSdkRepoPath + path.sep;

  const isRelativeTraversal =
    !path.isAbsolute(packageFolderPath) &&
    (packageFolderPath === ".." || packageFolderPath.startsWith(".." + path.sep));

  const isOutsideRepoByPrefix = !absolutePackagePath.startsWith(normalizedSdkRepoPathWithSep);

  const isOutsideRepoByRelative =
    relativePackagePath === ".." || relativePackagePath.startsWith(".." + path.sep);

  if (isRelativeTraversal || isOutsideRepoByPrefix || isOutsideRepoByRelative) {
    logger.error(
      `The provided packagePath ("${packageFolderPath}") resolves outside the sdkRepoPath ("${sdkRepoPath}"). ` +
        `Please provide a package path that is within the SDK repository root.`,
    );
    process.exit(1);
  }
  logger.info(`SDK Repo Path: ${normalizedSdkRepoPath}`);
  logger.info(`Package Path (absolute): ${absolutePackagePath}`);
  logger.info(`Package Path (relative): ${relativePackagePath}`);

  const npmPackageInfo = await getNpmPackageInfo(absolutePackagePath);

  const ciPath = await createOrUpdateCiYaml(
    relativePackagePath.replace(/\\/g, "/"),
    npmPackageInfo,
  );

  logger.info(`CI yaml file created/updated at: ${ciPath}`);
};

const optionDefinitions = [
  { name: "sdkRepoPath", type: String },
  { name: "packagePath", type: String },
];

const options = commandLineArgs(optionDefinitions);

generateCiYamlCli(options["sdkRepoPath"], options["packagePath"]);
