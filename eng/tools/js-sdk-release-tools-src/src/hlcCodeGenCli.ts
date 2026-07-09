#!/usr/bin/env node

import { logger } from './utils/logger.js';
import { getLastCommitId } from './utils/git.js';
import { generateMgmt } from './hlc/generateMgmt.js';

import shell from 'shelljs';

async function automationGenerateInTerminal(
  absoluteReadmeMd: string,
  tag?: string,
  use?: string,
  apiVersion?: string,
  sdkReleaseType?: string,
  additionalArgs?: string
) {
  const regexResult = /^(.*[\/\\]azure-rest-api-specs[-pr]*)[\/\\](specification.*)/.exec(absoluteReadmeMd);
  if (!regexResult || regexResult.length !== 3) {
    logger.error(`Failed to parse README file path '${absoluteReadmeMd}'.`);
    logger.error(
      `Ensure the READMD file '${absoluteReadmeMd}' exist and is valid. Refer to the sample file at https://github.com/Azure/azure-rest-api-specs/tree/main/documentation/samplefiles`
    );
  } else {
    const gitCommitId = await getLastCommitId(regexResult[1]);
    await generateMgmt({
      sdkRepo: String(shell.pwd()),
      swaggerRepo: regexResult[1],
      readmeMd: regexResult[2],
      gitCommitId: gitCommitId,
      tag: tag,
      use: use,
      additionalArgs: additionalArgs,
      apiVersion: apiVersion,
      sdkReleaseType: sdkReleaseType,
    });
  }
}

const optionDefinitions = [
  { name: 'use', type: String },
  { name: 'tag', type: String },
  { name: 'readme', type: String },
  { name: 'apiVersion', type: String },
  { name: 'sdkReleaseType', type: String },
  { name: 'additional-args', type: String },
];
import commandLineArgs from 'command-line-args';
const options = commandLineArgs(optionDefinitions);
automationGenerateInTerminal(
  options.readme,
  options.tag,
  options.use,
  options.apiVersion,
  options.sdkReleaseType,
  options['additional-args']
);
