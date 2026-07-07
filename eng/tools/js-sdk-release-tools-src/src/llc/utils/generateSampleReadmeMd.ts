import * as fs from 'fs';
import * as path from 'path';
import {
  changeRequiredReadmePath,
  getConfigFromReadmeMd,
  getInputFromCommand,
  getInputFromCommandWithDefaultValue,
  getLatestCodegen,
} from './utils.js';
import { logger } from '../../utils/logger.js';

async function writeReadmeMd(packageName: string, packagePath: string, options: any) {
  const sampleReadme = `# Azure Sample Readme for RLC

> see https://aka.ms/autorest

## Configuration

\`\`\`yaml
package-name: "${packageName}"
title: ${options.title}
description: ${options.description}
generate-metadata: true
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: ${options.inputFile}
package-version: ${options.packageVersion}
rest-level-client: true
add-credentials: true
credential-scopes: "${options.credentialScopes}"
use-extension:
  "@autorest/typescript": "${await getLatestCodegen(packagePath)}"
\`\`\`
`;
  if (!fs.existsSync(path.join(packagePath, 'swagger'))) {
    fs.mkdirSync(path.join(packagePath, 'swagger'));
  }
  fs.writeFileSync(path.join(packagePath, 'swagger', 'README.md'), sampleReadme, { encoding: 'utf-8' });
}

export async function generateSampleReadmeMd(packageName: string, packagePath: string, options: any) {
  const title = options.title ? options.title : await getInputFromCommand('title');
  const description = options.description ? options.description : await getInputFromCommand('description');
  let inputFile = options['input-file'] ? options['input-file'] : await getInputFromCommand('input-file');
  if (inputFile.includes(';')) {
    const inputFileArray = inputFile.split(';');
    inputFile = '';
    for (const i of inputFileArray) {
      inputFile = inputFile + '\n  -' + i;
    }
  }
  const packageVersion = options['package-version']
    ? options['package-version']
    : await getInputFromCommand('package-version');
  const credentialScopes = options['credential-scopes']
    ? options['credential-scopes']
    : await getInputFromCommand('credential-scopes');
  await writeReadmeMd(packageName, packagePath, {
    title: title,
    description: description,
    inputFile: inputFile,
    packageVersion: packageVersion,
    credentialScopes: credentialScopes,
  });
}

export async function modifyExistingReadmeMd(packageName: string, packagePath: string) {
  logger.info(`'${packageName}' is found in ${packagePath}, please confirm whether the value is expected?
If yes, please input Enter directly. If not, please enter a new value.`);
  const readme = await getConfigFromReadmeMd(path.join(packagePath, 'swagger', 'README.md'));
  const title = await getInputFromCommandWithDefaultValue('title', readme['title']);
  const description = await getInputFromCommandWithDefaultValue('description', readme['description']);
  let existingInputArray;
  if (Array.isArray(readme['input-file'])) {
    existingInputArray = readme['input-file'].join(';');
  } else {
    existingInputArray = readme['input-file'];
  }
  let inputFile = await getInputFromCommandWithDefaultValue('input-file', existingInputArray);
  if (inputFile.includes(';')) {
    const inputFileArray = inputFile.split(';');
    inputFile = '';
    for (const i of inputFileArray) {
      inputFile = inputFile + '\n  -' + i;
    }
  }

  const packageVersion = await getInputFromCommandWithDefaultValue('package-version', readme['package-version']);
  const credentialScopes = await getInputFromCommandWithDefaultValue('credential-scopes', readme['credential-scopes']);

  await writeReadmeMd(packageName, packagePath, {
    title: title,
    description: description,
    inputFile: inputFile,
    packageVersion: packageVersion,
    credentialScopes: credentialScopes,
  });
}

export function replaceRequireInAutorestConfigurationFile(autorestConfigFilePath: string, ori: string, latest: string) {
  const readmeMdContent = fs.readFileSync(autorestConfigFilePath, 'utf-8');
  fs.writeFileSync(autorestConfigFilePath, readmeMdContent.replace(ori, latest), { encoding: 'utf-8' });
}
