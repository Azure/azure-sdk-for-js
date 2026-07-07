#!/usr/bin/env node

import commandLineArgs from 'command-line-args';
import {
  generateChangelogAndBumpVersion,
  UpdateMode,
} from './common/changelog/automaticGenerateChangeLogAndBumpVersion.js';
import { logger } from './utils/logger.js';

const generateChangelogCli = async (sdkRepoPath: string | undefined, packageFolderPath: string | undefined) => {
  if (!sdkRepoPath || !packageFolderPath) {
    logger.error(`SdkRepoPath and PackagePath are required.`);
    logger.error(`Usage: generateChangelogCli --sdkRepoPath <SdkRepoPath> --packagePath <PackagePath>`);
    process.exit(1);
  }

  await generateChangelogAndBumpVersion(
    packageFolderPath,
    {
      apiVersion: undefined,
      sdkReleaseType: undefined,
    },
    UpdateMode.ChangelogOnly,
    sdkRepoPath
  );
};

const optionDefinitions = [
  { name: 'sdkRepoPath', type: String },
  { name: 'packagePath', type: String },
];

const options = commandLineArgs(optionDefinitions);

generateChangelogCli(options['sdkRepoPath'], options['packagePath']);
