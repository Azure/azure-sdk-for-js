#!/usr/bin/env node

import * as path from "path";
import { generateMgmt } from "./hlc/generateMgmt.js";
import { backupNodeModules, restoreNodeModules } from "./utils/backupNodeModules.js";
import { logger } from "./utils/logger.js";
import { ModularClientPackageOptions, SDKType, RunMode } from "./common/types.js";
import { generateAzureSDKPackage } from "./mlc/clientGenerator/modularClientPackageGenerator.js";
import { parseInputJson } from "./utils/generateInputUtils.js";
import { configureNpmFromRepo } from "./common/npmUtils.js";
import shell from "shelljs";
import fs from "fs";

async function automationGenerateInPipeline(
  inputJsonPath: string,
  outputJsonPath: string,
  use: string | undefined,
  localOverride?: boolean,
) {
  const inputJson = JSON.parse(fs.readFileSync(inputJsonPath, { encoding: "utf-8" }));
  const {
    sdkType,
    specFolder,
    readmeMd,
    gitCommitId,
    outputJson,
    repoHttpsUrl,
    downloadUrlPrefix,
    skipGeneration,
    runningEnvironment,
    typespecProject,
    apiVersion,
    runMode,
    sdkReleaseType,
  } = await parseInputJson(inputJson);
  // If --local parameter is used, local is true; otherwise, determine from runMode
  const local = localOverride || runMode === RunMode.Local;
  try {
    if (local) {
      configureNpmFromRepo(String(shell.pwd()));
    }
    if (!local) {
      await backupNodeModules(String(shell.pwd()));
    }
    switch (sdkType) {
      case SDKType.HighLevelClient:
        await generateMgmt({
          sdkRepo: String(shell.pwd()),
          swaggerRepo: specFolder,
          readmeMd: readmeMd!,
          gitCommitId: gitCommitId,
          use: use,
          outputJson: outputJson,
          swaggerRepoUrl: repoHttpsUrl,
          downloadUrlPrefix: downloadUrlPrefix,
          skipGeneration: skipGeneration,
          runningEnvironment: runningEnvironment,
          apiVersion: apiVersion,
          sdkReleaseType: sdkReleaseType,
          runMode: runMode as RunMode,
        });
        break;
      case SDKType.RestLevelClient:
        throw new Error(
          `Rest Level Client (RLC) generation is no longer supported in the SDK automation pipeline. ` +
            `If you are using a TypeSpec project, ensure 'is-modular-library' is not set to false in tspconfig.yaml (or remove the option entirely to use the default modular client). ` +
            `If you are using a Swagger-based (non-management) configuration, please migrate the service to TypeSpec. ` +
            `For guidance, see https://aka.ms/azsdk/typespec-migration.`,
        );

      case SDKType.ModularClient: {
        const typeSpecDirectory = path.posix.join(specFolder, typespecProject!);
        const sdkRepoRoot = String(shell.pwd()).replaceAll("\\", "/");
        const skip = skipGeneration ?? false;
        const repoUrl = repoHttpsUrl;
        const options: ModularClientPackageOptions = {
          sdkRepoRoot,
          specRepoRoot: specFolder,
          typeSpecDirectory,
          gitCommitId,
          skip,
          repoUrl,
          local,
          // support MPG for now
          versionPolicyName: "management",
          apiVersion: apiVersion,
          sdkReleaseType: sdkReleaseType,
          runMode: runMode as RunMode,
        };
        const packageResult = await generateAzureSDKPackage(options);
        outputJson.packages = [packageResult];
        break;
      }
      default:
        break;
    }
  } catch (e) {
    const packageNameStr = `'${outputJson.packages?.[0]?.packageName}' `;
    logger.error(
      `Failed to generate SDK for package ${packageNameStr ?? ""}due to ${(e as Error)?.stack ?? e}.`,
    );
    logger.error(`Please review the detail errors for potential fixes.`);
    logger.error(
      `If the issue persists, contact the support channel at https://aka.ms/azsdk/js-teams-channel and include this spec pull request.`,
    );
    throw e;
  } finally {
    if (!local) {
      await restoreNodeModules(String(shell.pwd()));
    }
    fs.writeFileSync(outputJsonPath, JSON.stringify(outputJson, null, "  "), { encoding: "utf-8" });
  }
}

const optionDefinitions = [
  { name: "use", type: String },
  { name: "typespecEmitter", type: String },
  { name: "sdkGenerationType", type: String },
  { name: "inputJsonPath", type: String },
  { name: "outputJsonPath", type: String },
  // this option should be only used in local run, it will skip backup node modules, etc.
  // do NOT set to true in sdk automation pipeline
  { name: "local", type: Boolean, defaultValue: false },
];
import commandLineArgs from "command-line-args";
const options = commandLineArgs(optionDefinitions);
automationGenerateInPipeline(
  options.inputJsonPath,
  options.outputJsonPath,
  options.use,
  options.local,
).catch((e) => {
  logger.error(e.message);
  process.exit(1);
});
