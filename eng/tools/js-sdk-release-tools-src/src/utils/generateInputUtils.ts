import path from 'path';
import { SDKType, RunMode, ModularSDKType } from '../common/types.js';
import { loadTspConfig } from '../common/utils.js';
import { RunningEnvironment } from './runningEnvironment.js';
import { exists } from 'fs-extra';

async function isModularClient(specFolder: string, typespecProjectFolder: string[] | string | undefined) {
  if (!typespecProjectFolder) {
    return false;
  }

  if (Array.isArray(typespecProjectFolder) && (typespecProjectFolder as string[]).length !== 1) {
    throw new Error(
      `Unexpected typespecProjectFolder length: ${(typespecProjectFolder as string[]).length} (expect 1)`
    );
  }

  const resolvedRelativeTspFolder = Array.isArray(typespecProjectFolder)
    ? typespecProjectFolder[0]
    : (typespecProjectFolder as string);
  const tspFolderFromSpecRoot = path.join(specFolder, resolvedRelativeTspFolder);
  const tspConfigPath = path.join(tspFolderFromSpecRoot, 'tspconfig.yaml');
  if (!(await exists(tspConfigPath))) {
    return false;
  }
  const tspConfig = await loadTspConfig(tspFolderFromSpecRoot);
  const isModularLibrary = tspConfig?.options?.['@azure-tools/typespec-ts']?.['is-modular-library'];

  return isModularLibrary !== false;
}

// TODO: consider add stricter rules for RLC in when update SDK automation for RLC
function getSDKType(isMgmtWithHLC: boolean, isModular: boolean) {
  if (isMgmtWithHLC) {
    return SDKType.HighLevelClient;
  }
  if (isModular) {
    return SDKType.ModularClient;
  }
  return SDKType.RestLevelClient;
}

// TODO: generate interface for inputJson
export async function parseInputJson(inputJson: any) {
  // inputJson schema: https://github.com/Azure/azure-rest-api-specs/blob/main/documentation/sdkautomation/GenerateInputSchema.json
  // todo: add interface for the schema
  const specFolder: string = inputJson['specFolder'];
  const readmeFiles: string[] | string | undefined = inputJson['relatedReadmeMdFiles']
    ? inputJson['relatedReadmeMdFiles']
    : inputJson['relatedReadmeMdFile'];
  const typespecProjectFolder: string[] | string | undefined = inputJson['relatedTypeSpecProjectFolder'];
  const gitCommitId: string = inputJson['headSha'];
  const repoHttpsUrl: string = inputJson['repoHttpsUrl'];
  const runMode: string = inputJson['runMode'];
  let apiVersion: string | undefined;
  let sdkReleaseType: string | undefined;
  const downloadUrlPrefix: string | undefined = inputJson.installInstructionInput?.downloadUrlPrefix;
  // TODO: consider remove it, since it's not defined in inputJson schema
  const skipGeneration: boolean | undefined = inputJson['skipGeneration'];

  if (!readmeFiles && !typespecProjectFolder) {
    throw new Error(`readme files and typespec project info are both undefined`);
  }

  if (typespecProjectFolder && typeof typespecProjectFolder !== 'string' && typespecProjectFolder.length !== 1) {
    throw new Error(`get ${typespecProjectFolder.length} typespec project`);
  }

  const isTypeSpecProject = !!typespecProjectFolder;

  const packages: any[] = [];
  const outputJson = {
    packages: packages,
    language: 'JavaScript',
  };
  const readmeMd = isTypeSpecProject ? undefined : typeof readmeFiles === 'string' ? readmeFiles : readmeFiles![0];
  const typespecProject = isTypeSpecProject
    ? typeof typespecProjectFolder === 'string'
      ? typespecProjectFolder
      : typespecProjectFolder![0]
    : undefined;
  const runningEnvironment =
    typeof readmeFiles === 'string' || typeof typespecProjectFolder === 'string'
      ? RunningEnvironment.SdkGeneration
      : RunningEnvironment.SwaggerSdkAutomation;

  const isMgmtWithHLC = isTypeSpecProject ? false : readmeMd!.includes('resource-manager');
  const isModular = await isModularClient(specFolder, typespecProjectFolder);
  const sdkType = getSDKType(isMgmtWithHLC, isModular);

  if (runMode === RunMode.Release || runMode === RunMode.Local) {
    apiVersion = inputJson['apiVersion'];
    sdkReleaseType = inputJson['sdkReleaseType'];
  }

  if (
    apiVersion &&
    apiVersion.toLowerCase().includes('preview') &&
    sdkReleaseType &&
    sdkReleaseType.toLowerCase() === 'stable'
  ) {
    throw new Error(`SDK release type must be set to 'beta' for the preview API specifications.`);
  }

  return {
    sdkType,
    specFolder,
    gitCommitId,
    repoHttpsUrl,
    downloadUrlPrefix,
    readmeMd,
    outputJson,
    skipGeneration,
    runningEnvironment,
    typespecProject,
    apiVersion,
    runMode,
    sdkReleaseType,
  };
}

export function getModularSDKType(packageDirectory: string) {
  if (packageDirectory.includes('arm-')) {
    return ModularSDKType.ManagementPlane;
  }
  return ModularSDKType.DataPlane;
}
