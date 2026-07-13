import { SDKType } from '../../common/types.js';
import { getSDKType } from '../../common/utils.js';
import { logger } from '../../utils/logger.js';
import { isModelOnly } from '../apiVersion/apiVersionTypeExtractor.js';
import { isBetaVersion } from '../../utils/version.js';

import * as fs from 'fs';
import * as path from 'path';

export async function updateUserAgent(packageFolderPath: string, packageVersion: string) {
  const packageJsonData: any = JSON.parse(fs.readFileSync(path.join(packageFolderPath, 'package.json'), 'utf8'));
  let packageName: string;

  if (packageJsonData.name.startsWith('@azure-rest/')) {
    packageName = packageJsonData.name.replace('@azure-rest/', '') + '-rest';
  } else if (packageJsonData.name.startsWith('@azure/')) {
    packageName = packageJsonData.name.replace('@azure/', '');
  } else {
    packageName = packageJsonData.name;
  }
  const sdkType = getSDKType(packageFolderPath);
  let files: string[];
  switch (sdkType) {
    case SDKType.HighLevelClient:
      // Update version in src for HLC
      files = fs.readdirSync(path.join(packageFolderPath, 'src'));
      files.forEach((file) => {
        if (file.endsWith('.ts')) {
          const data: string = fs.readFileSync(path.join(packageFolderPath, 'src', file), 'utf8');
          const result = data.replace(
            /const packageDetails = `azsdk-js-[0-9a-z-]+\/[0-9.a-z-]+`;/g,
            'const packageDetails = `azsdk-js-' + packageName + '/' + packageVersion + '`;'
          );
          fs.writeFileSync(path.join(packageFolderPath, 'src', file), result, 'utf8');
        }
      });
      break;
    case SDKType.ModularClient:
      // Check if it's a model-only package for MLC
      const isModelOnlyForModularClient = await isModelOnly(packageFolderPath, isBetaVersion(packageVersion));
      if (isModelOnlyForModularClient) {
        logger.info(
          `Modular client package in ${packageFolderPath} is a model-only package, skipping user agent update.`
        );
        break;
      }

      // Update version in src for Modular
      files = fs.readdirSync(path.join(packageFolderPath, 'src', 'api'));
      files.forEach((file) => {
        if (file.endsWith('Context.ts')) {
          const data: string = fs.readFileSync(path.join(packageFolderPath, 'src', 'api', file), 'utf8');
          const result = data.replace(
            /const userAgentInfo = `azsdk-js-[0-9a-z-]+\/[0-9.a-z-]+`;/g,
            'const userAgentInfo = `azsdk-js-' + packageName + '/' + packageVersion + '`;'
          );
          fs.writeFileSync(path.join(packageFolderPath, 'src', 'api', file), result, 'utf8');
        }
      });
      break;
    case SDKType.RestLevelClient:
      // Update version in src for RLC
      files = fs.readdirSync(path.join(packageFolderPath, 'src'));
      files.forEach((file) => {
        if (file.endsWith('.ts')) {
          const data: string = fs.readFileSync(path.join(packageFolderPath, 'src', file), 'utf8');
          const result = data.replace(
            /const userAgentInfo = `azsdk-js-[0-9a-z-]+\/[0-9.a-z-]+`;/g,
            'const userAgentInfo = `azsdk-js-' + packageName + '/' + packageVersion + '`;'
          );
          fs.writeFileSync(path.join(packageFolderPath, 'src', file), result, 'utf8');
        }
      });
      break;
    default:
      logger.warn(`Unsupported SDK type ${sdkType} to update user agent`);
  }
}
