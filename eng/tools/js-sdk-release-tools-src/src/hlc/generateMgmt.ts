import { logger } from '../utils/logger.js';
import { execSync } from 'child_process';

import fs from 'fs';
import * as path from 'path';
import { getChangedCiYmlFilesInSpecificFolder, getChangedPackageDirectory } from '../utils/git.js';
import { generateChangelogAndBumpVersion } from '../common/changelog/automaticGenerateChangeLogAndBumpVersion.js';
import { Changelog } from '../changelog/changelogGenerator.js';
import { modifyOrGenerateCiYml } from '../utils/changeCiYaml.js';
import { changeConfigOfTestAndSample, ChangeModel, SdkType } from '../utils/changeConfigOfTestAndSample.js';
import { changeReadmeMd } from './utils/changeReadmeMd.js';
import { RunningEnvironment } from '../utils/runningEnvironment.js';
import { getOutputPackageInfo } from '../utils/getOutputPackageInfo.js';
import { getReleaseTool } from './utils/getReleaseTool.js';
import { addApiViewInfo } from '../utils/addApiViewInfo.js';
import { defaultChildProcessTimeout } from '../common/utils.js';
import { sanitizeAdditionalArgs } from '../common/utils.js';
import { lintFix, updateSnippets } from '../common/devToolUtils.js';
import { ensurePnpmInstalled } from '../common/rushUtils.js';
import { ChangelogResult } from '../changelog/v2/ChangelogGenerator.js';
import { RunMode } from '../common/types.js';

export async function generateMgmt(options: {
  sdkRepo: string;
  swaggerRepo: string;
  readmeMd: string;
  gitCommitId: string;
  tag?: string;
  use?: string;
  additionalArgs?: string;
  outputJson?: any;
  swaggerRepoUrl?: string;
  downloadUrlPrefix?: string;
  skipGeneration?: boolean;
  runningEnvironment?: RunningEnvironment;
  apiVersion: string | undefined;
  sdkReleaseType: string | undefined;
  runMode?: RunMode;
}) {
  logger.info(`Start to generate SDK from '${options.readmeMd}'.`);
  let cmd = '';
  if (!options.skipGeneration) {
    if (options.apiVersion && options.apiVersion !== '') {
      // for high level client, we will build a tag for the package
      logger.warn(`The specified api-version ${options.apiVersion} is going to apply to swagger.`);
      options.tag = `package-${options.apiVersion}`;
    }

    cmd = `autorest --version=3.9.7 --typescript --modelerfour.lenient-model-deduplication --azure-arm --head-as-boolean=true --license-header=MICROSOFT_MIT_NO_VERSION --generate-test --typescript-sdks-folder=${options.sdkRepo} ${path.join(options.swaggerRepo, options.readmeMd)}`;

    if (options.tag && options.tag !== '') {
      cmd += ` --tag=${options.tag}`;
    }

    if (options.use) {
      cmd += ` --use=${options.use}`;
    }

    if (options.additionalArgs) {
      cmd += ` ${sanitizeAdditionalArgs(options.additionalArgs)}`;
    }

    logger.info(`Start to execute command '${cmd}'`);
    try {
      execSync(cmd, { stdio: 'inherit', timeout: defaultChildProcessTimeout });
    } catch (e: any) {
      throw new Error(
        `Failed to generate codes for readme file: "${options.readmeMd}":\nErr: ${e}\nStderr: "${e.stderr}"\nStdout: "${e.stdout}"\nErrorStack: "${e.stack}"`
      );
    }
  }

  const changedPackageDirectories: Set<string> = await getChangedPackageDirectory(!options.skipGeneration);
  for (const changedPackageDirectory of changedPackageDirectories) {
    const packagePath: string = path.join(options.sdkRepo, changedPackageDirectory);
    let outputPackageInfo = getOutputPackageInfo(options.runningEnvironment, options.readmeMd, undefined);

    try {
      logger.info(`Start to install dependencies for ${changedPackageDirectory}.`);
      const packageJson = JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json'), { encoding: 'utf-8' }));
      const packageName = packageJson.name;

      if (!options.skipGeneration) {
        // change configuration to skip build test, sample
        changeConfigOfTestAndSample(packagePath, ChangeModel.Change, SdkType.Hlc);

        const metaInfo: any = {
          commit: options.gitCommitId,
          readme: options.readmeMd,
          autorest_command: cmd,
          repository_url: options.swaggerRepoUrl
            ? `${options.swaggerRepoUrl}.git`
            : 'https://github.com/Azure/azure-rest-api-specs.git',
          release_tool: getReleaseTool(),
        };
        if (options.tag) {
          metaInfo['tag'] = options.tag;
        }
        if (options.use) {
          metaInfo['use'] = options.use;
        }

        fs.writeFileSync(path.join(packagePath, '_meta.json'), JSON.stringify(metaInfo, null, '  '), {
          encoding: 'utf-8',
        });
        modifyOrGenerateCiYml(options.sdkRepo, changedPackageDirectory, packageName, true);
      }

      // @ts-ignore
      if (options.outputJson && options.runningEnvironment !== undefined && outputPackageInfo !== undefined) {
        outputPackageInfo.packageName = packageJson.name;

        if (options.runningEnvironment === RunningEnvironment.SdkGeneration) {
          outputPackageInfo.packageFolder = changedPackageDirectory;
        }

        outputPackageInfo.path.push(changedPackageDirectory);
        for (const file of await getChangedCiYmlFilesInSpecificFolder(path.dirname(changedPackageDirectory))) {
          outputPackageInfo.path.push(file);
        }
      }
      let changelog: ChangelogResult | undefined;
      await ensurePnpmInstalled();
      logger.info(`Start to run command: 'pnpm install'.`);
      execSync('pnpm install', { stdio: 'inherit' });

      if (options.runMode === RunMode.Local || options.runMode === RunMode.Release) {
        await lintFix(packagePath);
      }

      logger.info(
        `Start to run command: 'pnpm build --filter ${packageName}...', that builds generated codes, except test and sample, which may be written manually.`
      );
      execSync(`pnpm build --filter ${packageName}...`, { stdio: 'inherit' });
      logger.info('Start to generate changelog and bump version...');
      if (!options.skipGeneration) {
        changelog = await generateChangelogAndBumpVersion(changedPackageDirectory, options);
      }
      logger.info(`Start to run command: 'pnpm run --filter ${packageJson.name}... pack'.`);
      execSync(`pnpm run --filter ${packageJson.name}... pack`, { stdio: 'inherit' });

      await updateSnippets(packagePath);

      if (!options.skipGeneration) {
        changeReadmeMd(packagePath);
      }

      // @ts-ignore
      if (options.outputJson && options.runningEnvironment !== undefined && outputPackageInfo !== undefined) {
        if (changelog) {
          outputPackageInfo.changelog.hasBreakingChange = changelog.hasBreakingChange;
          outputPackageInfo.changelog.content = changelog.content;
          const breakingChangeItems = changelog.breakingChangeItems;
          if (!!breakingChangeItems && breakingChangeItems.length > 0) {
            outputPackageInfo.changelog['breakingChangeItems'] = breakingChangeItems;
          } else {
            outputPackageInfo.changelog['breakingChangeItems'] = [];
          }
        }

        const newPackageJson = JSON.parse(
          fs.readFileSync(path.join(packagePath, 'package.json'), { encoding: 'utf-8' })
        );
        const newVersion = newPackageJson['version'];
        outputPackageInfo['version'] = newVersion;

        let artifactName: string | undefined = undefined;
        for (const file of fs.readdirSync(packagePath)) {
          if (file.startsWith('azure-arm') && file.endsWith('.tgz')) {
            outputPackageInfo.artifacts.push(path.join(changedPackageDirectory, file));
            artifactName = file;
          }
        }
        addApiViewInfo(outputPackageInfo, packagePath, changedPackageDirectory);
        if (!outputPackageInfo.packageName.startsWith('@azure/arm-')) {
          throw new Error(`Unexpected package name: ${outputPackageInfo.packageName}`);
        }
        if (!!options.downloadUrlPrefix && !!artifactName) {
          outputPackageInfo.installInstructions = {
            full: `Please install the package by \`npm install ${options.downloadUrlPrefix}${outputPackageInfo.packageName.replace('/', '_')}/${artifactName}\``,
          };
        }
      }
    } catch (e: any) {
      logger.error(
        `Failed to build for readme file '${options.readmeMd}'.\nErr: ${e}\nStderr: "${e.stderr}"\nStdout: "${e.stdout}"\nErrorStack: "${e.stack}"`
      );
      logger.error(
        `Please check out https://github.com/Azure/autorest/blob/main/docs/troubleshooting.md to troubleshoot the issue.`
      );
      if (outputPackageInfo) {
        outputPackageInfo.result = 'failed';
      }
    } finally {
      if (options.outputJson && outputPackageInfo) {
        options.outputJson.packages.push(outputPackageInfo);
      }
      if (!options.skipGeneration) {
        changeConfigOfTestAndSample(packagePath, ChangeModel.Revert, SdkType.Hlc);
      }
    }
  }
  logger.info(`Generate SDK from '${options.readmeMd}' successfully.`);
}
