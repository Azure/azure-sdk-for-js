import {
  getApiVersionTypeFromOperations,
  getApiVersionTypeFromRestClient,
  tryFindRestClientPath,
  getApiVersionTypeFromNpm,
} from '../../xlc/apiVersion/utils.js';

import { ApiVersionType } from '../../common/types.js';
import { IApiVersionTypeExtractor, IModelOnlyChecker } from '../../common/interfaces.js';
import { join } from 'path';
import pkg from 'fs-extra';
const { exists, readFile } = pkg;
import { logger } from '../../utils/logger.js';
import { parse } from 'yaml';
import { iterate, MarkDownEx, parseMarkdown } from '@azure-tools/openapi-tools-common';
import { getNpmPackageName } from '../../common/utils.js';
import { isBetaVersion } from '../../utils/version.js';

function extractAutorestConfig(readme: MarkDownEx) {
  let isInConfigurationSection = false;
  for (const node of iterate(readme.markDown)) {
    if (node.type === 'heading' && node.level === 2 && node.firstChild?.literal?.trim() === 'Configuration') {
      isInConfigurationSection = true;
      continue;
    }

    if (node.type === 'heading' && node.level >= 2 && node.firstChild?.literal?.trim() !== 'Configuration') {
      isInConfigurationSection = false;
      continue;
    }

    // find yaml code block
    if (isInConfigurationSection && node.type === 'code_block' && node.info === 'yaml' && node.literal !== null) {
      return parse(node.literal);
    }
  }
}

async function resolveParameterPath(packageRoot: string) {
  let parametersPath = join(packageRoot, 'src/parameters.ts');
  const swaggerReadmePath = join(packageRoot, 'swagger/README.md');
  const hasSwaggerReadme = await exists(swaggerReadmePath);
  if (hasSwaggerReadme) {
    const autoRestContent = await readFile(swaggerReadmePath, { encoding: 'utf-8' });
    const readme = parseMarkdown(autoRestContent);
    const config = extractAutorestConfig(readme);
    const sourceFolderPath = config['source-code-folder-path'];
    if (sourceFolderPath) parametersPath = join(packageRoot, sourceFolderPath, 'parameters.ts');
  }
  return parametersPath;
}

export const getApiVersionType: IApiVersionTypeExtractor = async (
  packageRoot: string,
  apiVersion?: string
): Promise<ApiVersionType> => {
  if (apiVersion) {
    return isBetaVersion(apiVersion) ? ApiVersionType.Preview : ApiVersionType.Stable;
  }

  // NOTE: when there's customized code, emitter must put generated code in root/generated folder
  const clientPatterns = ['generated/*Context.ts', 'generated/*Client.ts', 'src/*Context.ts', 'src/*Client.ts'];
  for (const pattern of clientPatterns) {
    const typeFromClient = await getApiVersionTypeFromRestClient(packageRoot, pattern, tryFindRestClientPath);
    if (typeFromClient !== ApiVersionType.None) return typeFromClient;
  }

  const isModelOnlyPackage = await isModelOnly(packageRoot);
  if (isModelOnlyPackage) {
    const packageName = getNpmPackageName(packageRoot);
    return await getApiVersionTypeFromNpm(packageName);
  }

  // Fall back to parameters.ts
  logger.info("Fallback to get api version type from operation's parameter");
  const parametersPath = await resolveParameterPath(packageRoot);
  const typeFromOperations = getApiVersionTypeFromOperations(parametersPath);
  if (typeFromOperations !== ApiVersionType.None) return typeFromOperations;
  return ApiVersionType.Stable;
};

export const isModelOnly: IModelOnlyChecker = async (packageRoot: string): Promise<boolean> => {
  // For LLC, simply check for parameters.ts - its absence indicates a model-only service
  const parametersPath = await resolveParameterPath(packageRoot);
  const isParametersExists = await exists(parametersPath);

  if (!isParametersExists) {
    logger.warn(`No parameters.ts found in ${packageRoot}, this is a model-only service in LLC`);
    return true;
  }

  logger.info(`Found parameters.ts in ${packageRoot}, this is not a model-only service`);
  return false;
};
