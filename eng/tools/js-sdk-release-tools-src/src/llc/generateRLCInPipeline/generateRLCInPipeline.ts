import { execSync } from "child_process";
import fs from "fs";
import * as path from "path";
import { addApiViewInfo } from "../../utils/addApiViewInfo.js";
import { modifyOrGenerateCiYml } from "../../utils/changeCiYaml.js";
import {
  changeConfigOfTestAndSample,
  ChangeModel,
  SdkType,
} from "../../utils/changeConfigOfTestAndSample.js";
import { getOutputPackageInfo } from "../../utils/getOutputPackageInfo.js";
import { getChangedCiYmlFilesInSpecificFolder } from "../../utils/git.js";
import { logger } from "../../utils/logger.js";
import { RunningEnvironment } from "../../utils/runningEnvironment.js";
import { prepareCommandToInstallDependenciesForTypeSpecProject } from "../utils/prepareCommandToInstallDependenciesForTypeSpecProject.js";
import { replaceRequireInAutorestConfigurationFile } from "../utils/generateSampleReadmeMd.js";
import { updateTypeSpecProjectYamlFile } from "../utils/updateTypeSpecProjectYamlFile.js";
import {
  defaultChildProcessTimeout,
  getGeneratedPackageDirectory,
  generateRepoDataInTspLocation,
  specifyApiVersionToGenerateSDKByTypeSpec,
  cleanUpPackageDirectory,
} from "../../common/utils.js";
import { generateChangelogAndBumpVersion } from "../../common/changelog/automaticGenerateChangeLogAndBumpVersion.js";
import { updateChangelogResult } from "../../common/packageResultUtils.js";
import { formatSdk, updateSnippets, lintFix, customizeCodes } from "../../common/devToolUtils.js";
import { ensurePnpmInstalled } from "../../common/rushUtils.js";
import { RunMode } from "../../common/types.js";
import { exists } from "fs-extra";

export async function generateRLCInPipeline(options: {
  sdkRepo: string;
  swaggerRepo: string;
  readmeMd: string | undefined;
  typespecProject: string | undefined;
  sdkGenerationType: "script" | "command";
  swaggerRepoUrl: string;
  gitCommitId: string;
  typespecEmitter: string;
  use?: string;
  outputJson?: any;
  skipGeneration?: boolean;
  runningEnvironment?: RunningEnvironment;
  apiVersion: string | undefined;
  sdkReleaseType: string | undefined;
  runMode: RunMode;
}) {
  let packagePath: string | undefined;
  let relativePackagePath: string | undefined;
  const outputPackageInfo = getOutputPackageInfo(
    options.runningEnvironment,
    options.readmeMd,
    options.typespecProject,
  );
  if (options.typespecProject) {
    const typespecProject = path.join(options.swaggerRepo, options.typespecProject);
    const generatedPackageDir = await getGeneratedPackageDirectory(
      typespecProject,
      options.sdkRepo,
    );

    await cleanUpPackageDirectory(generatedPackageDir, options.runMode);
    if (!options.skipGeneration) {
      logger.info(`Start to generate rest level client SDK from '${options.typespecProject}'.`);
      // TODO: remove it, since this function is used in pipeline.
      if (options.sdkGenerationType === "command") {
        logger.info("Start to run TypeSpec command directly.");
        const copyPackageJsonName = "emitter-package.json";
        logger.info(
          `Start to copy package.json file if not exist from SDK repo '${copyPackageJsonName}'.`,
        );
        const installCommand = prepareCommandToInstallDependenciesForTypeSpecProject(
          path.join(options.sdkRepo, "eng", copyPackageJsonName),
          path.join(options.swaggerRepo, options.typespecProject, "package.json"),
        );
        logger.info(`Start to run command: '${installCommand}'`);
        execSync(installCommand, {
          stdio: "inherit",
          cwd: path.join(options.swaggerRepo, options.typespecProject),
        });
        updateTypeSpecProjectYamlFile(
          path.join(options.swaggerRepo, options.typespecProject, "tspconfig.yaml"),
          options.sdkRepo,
          options.typespecEmitter,
        );
        let typespecSource = ".";
        if (fs.existsSync(path.join(options.swaggerRepo, options.typespecProject, "client.tsp"))) {
          typespecSource = "client.tsp";
        }
        logger.info(
          `Start to run command: 'npx tsp compile ${typespecSource} --emit ${options.typespecEmitter} --arg "js-sdk-folder=${options.sdkRepo}"'.`,
        );
        execSync(
          `npx tsp compile ${typespecSource} --emit ${options.typespecEmitter} --arg "js-sdk-folder=${options.sdkRepo}"`,
          {
            stdio: "inherit",
            cwd: path.join(options.swaggerRepo, options.typespecProject),
          },
        );
        logger.info("End with TypeSpec command.");
      } else {
        logger.info("Start to generate code by tsp-client.");
        const tspDefDir = path.join(options.swaggerRepo, options.typespecProject);
        if (options.apiVersion) {
          specifyApiVersionToGenerateSDKByTypeSpec(tspDefDir, options.apiVersion);
        }
        const tspClientDir = path.join(process.cwd(), "eng", "common", "tsp-client");

        logger.info(`Using tsp-client from: ${tspClientDir}`);
        const scriptCommand = [
          "npm",
          "--prefix",
          tspClientDir,
          "exec",
          "--no",
          "--",
          "tsp-client",
          "init",
          "--update-if-exists",
          "--debug",
          "--tsp-config",
          path.join(tspDefDir, "tspconfig.yaml"),
          "--local-spec-repo",
          tspDefDir,
          "--repo",
          generateRepoDataInTspLocation(options.swaggerRepoUrl),
          "--commit",
          options.gitCommitId,
        ].join(" ");
        logger.info(`Start to run command: '${scriptCommand}'`);
        execSync(scriptCommand, { stdio: "inherit" });
        logger.info("Generated code by tsp-client successfully.");
      }
      packagePath = generatedPackageDir;
      relativePackagePath = path.relative(options.sdkRepo, packagePath);
    }
  } else {
    logger.info(`Start to generate SDK from '${options.readmeMd}'.`);
    if (!options.skipGeneration) {
      let autorestConfigFilePath: string | undefined;
      let isMultiClient: boolean = false;
      {
        logger.info(`Start to find autorest configuration in sdk repository.`);
        const sdkFolderPath = path.join(options.sdkRepo, "sdk");
        for (const rp of fs.readdirSync(sdkFolderPath)) {
          logger.info(`Start to find autorest configuration in '${rp}'.`);
          if (!!autorestConfigFilePath) break;
          const rpFolderPath = path.join(sdkFolderPath, rp);
          if (fs.lstatSync(rpFolderPath).isDirectory()) {
            for (const packageFolder of fs.readdirSync(rpFolderPath)) {
              if (!!autorestConfigFilePath) break;
              if (!packageFolder.endsWith("-rest")) continue;

              const packageFolderPath = path.join(rpFolderPath, packageFolder);
              if (!fs.lstatSync(packageFolderPath).isDirectory()) {
                continue;
              }
              const currentAutorestConfigFilePath = path.join(
                packageFolderPath,
                "swagger",
                "README.md",
              );
              if (!fs.existsSync(currentAutorestConfigFilePath)) {
                continue;
              }

              const autorestConfigFilterRegex = new RegExp(
                `require:[\\s]*-?[\\s]*(.*${options.readmeMd!.replace(/\//g, "\\/").replace(/\./, "\\.")})`,
              );
              const autoRestConfigContent = fs.readFileSync(currentAutorestConfigFilePath, "utf-8");
              const regexExecResult = autorestConfigFilterRegex.exec(autoRestConfigContent);
              const requireFoundOnlyOne = regexExecResult && regexExecResult.length === 2;

              const InputFilePattern = new RegExp(
                `input-file:.*${path.dirname(options.readmeMd!)}.*`,
              );
              const containsInputFile = InputFilePattern.test(autoRestConfigContent);

              if (containsInputFile || requireFoundOnlyOne) {
                // NOTE: it can be overrided from other RPs
                if (requireFoundOnlyOne)
                  replaceRequireInAutorestConfigurationFile(
                    currentAutorestConfigFilePath,
                    regexExecResult![1],
                    path.join(options.swaggerRepo, options.readmeMd!),
                  );
                autorestConfigFilePath = currentAutorestConfigFilePath;
                isMultiClient = fs
                  .readFileSync(currentAutorestConfigFilePath, "utf-8")
                  .includes("multi-client");
                break;
              }
            }
          }
        }
      }

      if (!autorestConfigFilePath) {
        logger.warn(
          `Failed to find autorest configuration in spec PR comment or sdk repository, skip generating codes.`,
        );
        logger.warn(
          `The autorest config file path should be 'sdk/<RP_NAME>-rest/swagger/README.md' in sdk repository, and the autorest config should contain one of the patterns:`,
        );
        logger.warn(
          `- input-file field contains the 'specification/<RP_NAME>/data-plane' in swagger repository.`,
        );
        logger.warn(
          `- require field contains the URL to 'specification/<RP_NAME>/data-plane/readme.md' in swagger repository.`,
        );
        logger.warn(
          `If you ensure there is autorest configuration file in sdk repository, please make sure it contains require keyword and the corresponding readme.md in swagger repository.`,
        );
        return;
      }

      packagePath = path.dirname(path.dirname(autorestConfigFilePath));
      relativePackagePath = path.relative(options.sdkRepo, packagePath);

      let cmd = `autorest --version=3.9.7 ${path.basename(autorestConfigFilePath)} --output-folder=${packagePath}`;
      if (options.use) {
        cmd += ` --use=${options.use}`;
      }
      if (isMultiClient) {
        cmd += ` --multi-client=true`;
      }

      if (options.apiVersion && options.apiVersion !== "") {
        // for high level client, we will build a tag for the package
        logger.warn(
          `The specified api-version ${options.apiVersion} is going to apply to swagger.`,
        );
        cmd += ` --tag=package-${options.apiVersion}`;
      }

      logger.info(`Start to run command: ${cmd}.`);
      try {
        execSync(cmd, {
          stdio: "inherit",
          cwd: path.dirname(autorestConfigFilePath),
          timeout: defaultChildProcessTimeout,
        });
      } catch (e: any) {
        throw new Error(
          `Failed to generate codes for readme file: "${options.readmeMd}":\nErr: ${e}\nStderr: "${e.stderr}"\nStdout: "${e.stdout}"\nErrorStack: "${e.stack}"`,
        );
      }
    }
  }

  try {
    if (!packagePath || !relativePackagePath) {
      throw new Error(`Failed to get package path`);
    }
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(packagePath, "package.json"), { encoding: "utf-8" }),
    );
    const packageName = packageJson.name;
    logger.info(`Start to generate some other files for '${packageName}' in '${packagePath}'.`);
    if (!options.skipGeneration) {
      await modifyOrGenerateCiYml(
        options.sdkRepo,
        packagePath,
        packageName,
        packageName.includes("arm"),
      );
      // TODO: remove it for typespec project, since no need now, the test and sample are decouple from build
      // change configuration to skip build test, sample
      changeConfigOfTestAndSample(packagePath, ChangeModel.Change, SdkType.Rlc);
    }

    if (
      options.outputJson &&
      options.runningEnvironment !== undefined &&
      outputPackageInfo !== undefined
    ) {
      outputPackageInfo.packageName = packageName;
      outputPackageInfo["version"] = packageJson.version;
      outputPackageInfo.path.push(relativePackagePath);
      for (const file of await getChangedCiYmlFilesInSpecificFolder(
        path.dirname(relativePackagePath),
      )) {
        outputPackageInfo.path.push(file);
      }
      if (options.runningEnvironment === RunningEnvironment.SdkGeneration) {
        outputPackageInfo.packageFolder = relativePackagePath;
      }
    }

    let buildStatus = `succeeded`;
    await ensurePnpmInstalled();
    logger.info(`Start to update.`);
    execSync("pnpm install", { stdio: "inherit" });

    await customizeCodes(packagePath);

    if (options.runMode === RunMode.Local || options.runMode === RunMode.Release) {
      await lintFix(packagePath);
    }

    logger.info(
      `Start to build '${packageName}', except for tests and samples, which may be written manually.`,
    );
    // To build generated codes except test and sample, we need to change tsconfig.json.

    if (options.runMode === RunMode.Local || options.runMode === RunMode.Release) {
      try {
        execSync(`pnpm build --filter ${packageName}...`, { stdio: "inherit" });
      } catch (error) {
        logger.warn(`Failed to build package due to: ${(error as Error)?.stack ?? error}`);
        buildStatus = `failed`;
      }
    } else {
      execSync(`pnpm run --filter ${packageName}... build`, { stdio: "inherit" });
    }

    logger.info(`Start to run command 'pnpm run --filter ${packageJson.name}... pack'.`);
    execSync(`pnpm run --filter ${packageJson.name}... pack`, { stdio: "inherit" });

    await formatSdk(packagePath);
    await updateSnippets(packagePath);

    if (!options.skipGeneration && buildStatus === "succeeded") {
      const getChangelogItems = () => {
        const categories = changelog?.changelogItems.breakingChanges.keys();
        if (!categories) return [];
        const items = [...categories]
          .sort()
          .flatMap((cat) => changelog?.changelogItems.breakingChanges.get(cat) ?? []);
        return items;
      };
      const changelog = await generateChangelogAndBumpVersion(relativePackagePath, options);
      outputPackageInfo.changelog.breakingChangeItems = getChangelogItems();
      outputPackageInfo.changelog.content = changelog?.content ?? "";
      outputPackageInfo.changelog.hasBreakingChange = changelog?.hasBreakingChange ?? false;
    }
    if (
      options.outputJson &&
      options.runningEnvironment !== undefined &&
      outputPackageInfo !== undefined
    ) {
      for (const file of fs.readdirSync(packagePath)) {
        if (file.startsWith("azure-rest") && file.endsWith(".tgz")) {
          outputPackageInfo.artifacts.push(path.join(relativePackagePath, file));
        }
      }
      addApiViewInfo(outputPackageInfo, packagePath, relativePackagePath);
    }
  } catch (e: any) {
    if (options.typespecProject) {
      logger.error(
        `Failed to build typespec project: "${options.typespecProject}":\nErr: ${e}\nStderr: "${e.stderr}"\nStdout: "${e.stdout}"\nErrorStack: "${e.stack}".`,
      );
      logger.error(
        `Please check out https://github.com/Azure/autorest.typescript/blob/main/packages/typespec-ts/CONTRIBUTING.md#how-to-debug to troubleshoot the issue.`,
      );
    } else {
      logger.error(
        `Failed to build for readme file: "${options.readmeMd}":\nErr: ${e}\nStderr: "${e.stderr}"\nStdout: "${e.stdout}"\nErrorStack: "${e.stack}".`,
      );
      logger.error(
        `Please check out https://github.com/Azure/autorest/blob/main/docs/troubleshooting.md to troubleshoot the issue.`,
      );
    }
    if (outputPackageInfo) {
      outputPackageInfo.result = "failed";
    }
    throw e;
  } finally {
    if (options.outputJson && outputPackageInfo) {
      options.outputJson.packages.push(outputPackageInfo);
    }
    if (!options.skipGeneration && !!packagePath) {
      changeConfigOfTestAndSample(packagePath, ChangeModel.Revert, SdkType.Rlc);
    }
  }
}
