import { posix } from "node:path";
import fsExtra from "fs-extra";
import unixify from "unixify";
import { generateChangelogAndBumpVersion } from "../common/changelog/automaticGenerateChangeLogAndBumpVersion.js";
import { createOrUpdateCiYaml } from "../common/ciYamlUtils.js";
import { ignoreLinkGenerator } from "../common/ignoreLink/ignoreLinkGenerator.js";
import { getNpmPackageInfo } from "../common/npmUtils.js";
import {
  initPackageResult,
  updateChangelogResult,
  updateNpmPackageResult,
} from "../common/packageResultUtils.js";
import {
  buildPackage,
  createArtifact,
  installDependencies,
  tryBuildSamples,
} from "../common/rushUtils.js";
import { ModularClientPackageOptions, NpmPackageInfo, PackageResult } from "../common/types.js";
import {
  cleanUpDirectory,
  getGeneratedPackageDirectory,
  specifyApiVersionToGenerateSDKByTypeSpec,
} from "../common/utils.js";
import { changeReadmeMd } from "../hlc/utils/changeReadmeMd.js";
import { generateTypeScriptCodeFromTypeSpec } from "../mlc/clientGenerator/utils/typeSpecUtils.js";
import { logger } from "../utils/logger.js";

const { exists } = fsExtra;

export async function generateProvisioningSDKPackage(
  options: ModularClientPackageOptions,
): Promise<PackageResult> {
  logger.info("Start to generate provisioning package for azure-sdk-for-js.");
  const packageResult = initPackageResult();
  try {
    const packageDirectory = await getGeneratedPackageDirectory(
      options.typeSpecDirectory,
      options.sdkRepoRoot,
      options.emitterName,
    );
    const relativePackageDirToSdkRoot = posix.relative(
      posix.normalize(options.sdkRepoRoot),
      posix.normalize(packageDirectory),
    );
    await ignoreLinkGenerator(options.typeSpecDirectory, options.emitterName);
    const packageJsonPath = posix.join(packageDirectory, "package.json");
    let originalNpmPackageInfo: NpmPackageInfo | undefined;
    if (await exists(packageJsonPath)) {
      originalNpmPackageInfo = await getNpmPackageInfo(packageDirectory);
    }

    await cleanUpDirectory(packageDirectory, ["test"]);
    if (options.apiVersion) {
      specifyApiVersionToGenerateSDKByTypeSpec(
        options.typeSpecDirectory,
        options.apiVersion,
        options.emitterName,
      );
    }
    await generateTypeScriptCodeFromTypeSpec(
      options,
      originalNpmPackageInfo?.version,
      packageDirectory,
    );

    await buildPackage(packageDirectory, options, packageResult);
    const changelog = await generateChangelogAndBumpVersion(relativePackageDirToSdkRoot, options);
    updateChangelogResult(packageResult, changelog);
    changeReadmeMd(packageDirectory);
    await installDependencies();
    await tryBuildSamples(packageDirectory, options.sdkRepoRoot, options.runMode);

    const npmPackageInfo = await getNpmPackageInfo(packageDirectory);
    const relativeTypeSpecDirToSpecRoot = posix.relative(
      unixify(options.specRepoRoot),
      unixify(options.typeSpecDirectory),
    );
    updateNpmPackageResult(
      packageResult,
      npmPackageInfo,
      relativeTypeSpecDirToSpecRoot,
      relativePackageDirToSdkRoot,
    );

    const artifactPath = await createArtifact(packageDirectory, options.sdkRepoRoot);
    packageResult.artifacts.push(
      posix.relative(unixify(options.sdkRepoRoot), unixify(artifactPath)),
    );

    const ciYamlPath = await createOrUpdateCiYaml(relativePackageDirToSdkRoot, npmPackageInfo);
    if (ciYamlPath) {
      packageResult.path.push(ciYamlPath);
    }

    packageResult.result = "succeeded";
    logger.info("Generated provisioning package successfully.");
    logger.info(`Package summary: ${JSON.stringify(packageResult, undefined, 2)}`);
    return packageResult;
  } catch (err) {
    packageResult.result = "failed";
    logger.error(`Failed to generate provisioning package due to ${(err as Error)?.stack ?? err}`);
    throw err;
  } finally {
    return packageResult;
  }
}
