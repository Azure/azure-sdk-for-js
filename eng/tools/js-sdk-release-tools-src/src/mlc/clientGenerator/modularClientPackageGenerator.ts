import { ModularClientPackageOptions, NpmPackageInfo, PackageResult } from '../../common/types.js';
import { buildPackage, createArtifact, tryBuildSamples } from '../../common/rushUtils.js';
import { initPackageResult, updateChangelogResult, updateNpmPackageResult } from '../../common/packageResultUtils.js';
import { posix } from 'node:path';
import { createOrUpdateCiYaml } from '../../common/ciYamlUtils.js';
import { generateChangelogAndBumpVersion } from '../../common/changelog/automaticGenerateChangeLogAndBumpVersion.js';
import { generateTypeScriptCodeFromTypeSpec } from './utils/typeSpecUtils.js';
import {
  getGeneratedPackageDirectory,
  specifyApiVersionToGenerateSDKByTypeSpec,
  cleanUpPackageDirectory,
} from '../../common/utils.js';
import { getNpmPackageInfo } from '../../common/npmUtils.js';
import { logger } from '../../utils/logger.js';
import { exists } from 'fs-extra';
import unixify from 'unixify';
import { codeOwnersAndIgnoreLinkGenerator } from '../../common/codeOwnersAndIgnoreLink/codeOwnersAndIgnoreLinkGenerator.js';
import { changeReadmeMd } from '../../hlc/utils/changeReadmeMd.js';

// !!!IMPORTANT:
// this function should be used ONLY in
//   1. the CodeGen pipeline of azure-rest-api-specs pull request for generating packages in azure-sdk-for-js
//   2. in the root directory of azure-sdk-for-js repo
// it has extra steps to generate a releasable azure sdk package (no modular client's doc for now, use RLC's for now) after typescript code is generate:
// https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/steps-after-generations.md
export async function generateAzureSDKPackage(options: ModularClientPackageOptions): Promise<PackageResult> {
  logger.info(`Start to generate modular client package for azure-sdk-for-js.`);
  const packageResult = initPackageResult();
  try {
    const packageDirectory = await getGeneratedPackageDirectory(options.typeSpecDirectory, options.sdkRepoRoot);
    const relativePackageDirToSdkRoot = posix.relative(
      posix.normalize(options.sdkRepoRoot),
      posix.normalize(packageDirectory)
    );
    await codeOwnersAndIgnoreLinkGenerator(relativePackageDirToSdkRoot, options.typeSpecDirectory, options.runMode);
    const packageJsonPath = posix.join(packageDirectory, 'package.json');
    let originalNpmPackageInfo: undefined | NpmPackageInfo;
    if (await exists(packageJsonPath)) originalNpmPackageInfo = await getNpmPackageInfo(packageDirectory);

    await cleanUpPackageDirectory(packageDirectory, options.runMode);
    if (options.apiVersion) {
      specifyApiVersionToGenerateSDKByTypeSpec(options.typeSpecDirectory, options.apiVersion);
    }
    await generateTypeScriptCodeFromTypeSpec(options, originalNpmPackageInfo?.version, packageDirectory);

    await buildPackage(packageDirectory, options, packageResult);

    // changelog generation will compute package version and bump it in package.json,
    // so changelog generation should be put before any task needs package.json's version,
    // TODO: consider to decouple version bump and changelog generation
    // TODO: to be compatible with current tool, input relative generated package dir
    const changelog = await generateChangelogAndBumpVersion(relativePackageDirToSdkRoot, options);
    updateChangelogResult(packageResult, changelog);
    changeReadmeMd(packageDirectory);
    await tryBuildSamples(packageDirectory, options.sdkRepoRoot, options.runMode);

    const npmPackageInfo = await getNpmPackageInfo(packageDirectory);
    const relativeTypeSpecDirToSpecRoot = posix.relative(
      unixify(options.specRepoRoot),
      unixify(options.typeSpecDirectory)
    );
    updateNpmPackageResult(packageResult, npmPackageInfo, relativeTypeSpecDirToSpecRoot, relativePackageDirToSdkRoot);

    const artifactPath = await createArtifact(packageDirectory, options.sdkRepoRoot);
    const relativeArtifactPath = posix.relative(unixify(options.sdkRepoRoot), unixify(artifactPath));
    packageResult.artifacts.push(relativeArtifactPath);

    const ciYamlPath = await createOrUpdateCiYaml(relativePackageDirToSdkRoot, npmPackageInfo);
    if (ciYamlPath) {
      packageResult.path.push(ciYamlPath);
    }

    packageResult.result = 'succeeded';
    logger.info(`Generated package successfully.`);
    logger.info(`Package summary: ${JSON.stringify(packageResult, undefined, 2)}`);
  } catch (err) {
    packageResult.result = 'failed';
    logger.error(`Failed to generate package due to ${(err as Error)?.stack ?? err}`);
    throw err;
  } finally {
    return packageResult;
  }
}
