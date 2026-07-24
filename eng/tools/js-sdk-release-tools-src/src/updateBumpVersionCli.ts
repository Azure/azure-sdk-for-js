#!/usr/bin/env node

import commandLineArgs from "command-line-args";
import {
  generateChangelogAndBumpVersion,
  UpdateMode,
} from "./common/changelog/automaticGenerateChangeLogAndBumpVersion.js";
import { logger } from "./utils/logger.js";

const updateBumpVersionCli = async (
  sdkRepoPath: string | undefined,
  packageFolderPath: string | undefined,
  sdkReleaseType?: string,
  sdkVersion?: string,
  sdkReleaseDate?: string,
) => {
  if (!sdkRepoPath || !packageFolderPath) {
    logger.error(`SdkRepoPath and PackagePath are required.`);
    logger.error(
      `Usage: updateBumpVersionCli --sdkRepoPath <SdkRepoPath> --packagePath <PackagePath> [--releaseType <type>] [--version <version>] [--releaseDate <date>]`,
    );
    process.exit(1);
  }

  await generateChangelogAndBumpVersion(
    packageFolderPath,
    {
      apiVersion: undefined,
      sdkReleaseType: sdkReleaseType,
      sdkVersion: sdkVersion,
      skdReleaseDate: sdkReleaseDate,
    },
    UpdateMode.VersionOnly,
    sdkRepoPath,
  );
};

const optionDefinitions = [
  { name: "sdkRepoPath", type: String },
  { name: "packagePath", type: String },
  { name: "releaseType", type: String },
  { name: "version", type: String },
  { name: "releaseDate", type: String },
];

const options = commandLineArgs(optionDefinitions);

updateBumpVersionCli(
  options["sdkRepoPath"],
  options["packagePath"],
  options["releaseType"],
  options.version,
  options["releaseDate"],
);
