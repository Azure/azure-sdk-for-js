/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { contains, endsWith, npmInstall, npmRunBuild } from "./.scripts/common";
import { getCommandLineOptions } from "./.scripts/commandLine";
import { findAzureRestApiSpecsRepositoryPath, findMissingSdks } from "./.scripts/generateSdks";
import { generateTsReadme, generateSdk, generateMissingSdk, generateAllMissingSdks, regenerate } from "./.scripts/gulp";
import { getPackageNamesFromReadmeTypeScriptMdFileContents, findReadmeTypeScriptMdFilePaths, getAbsolutePackageFolderPathFromReadmeFileContents } from "./.scripts/readme";
import { getLogger, LoggingLevel } from "./.scripts/logger";
import * as fs from "fs";
import * as gulp from "gulp";
import * as path from "path";
import * as yargs from "yargs";
import { execSync } from "child_process";

const _logger = getLogger();
const args = getCommandLineOptions();
const azureSDKForJSRepoRoot: string = args["azure-sdk-for-js-repo-root"] || __dirname;
const azureRestAPISpecsRoot: string = args["azure-rest-api-specs-root"] || path.resolve(azureSDKForJSRepoRoot, '..', 'azure-rest-api-specs');

const commonArgv = yargs.options({
  "logging-level": {
    alias: ["l", "loggingLevel"],
    default: "info",
    choices: ["all", "trace", "debug", "info", "warn", "error"],
    coerce: (str) => LoggingLevel[str],
  }
}).help("?")
  .showHelpOnFail(true, "Invalid usage. Run with -? to see help.");

function getPackageFolderPathFromPackageArgument(): string | undefined {
  let packageFolderPath: string | undefined;

  if (!args.package) {
    _logger.log(`No --package specified.`);
  } else {
    const typeScriptReadmeFilePaths: string[] = findReadmeTypeScriptMdFilePaths(azureRestAPISpecsRoot);

    let foundPackage = false;

    for (let i = 0; i < typeScriptReadmeFilePaths.length; ++i) {
      const typeScriptReadmeFilePath: string = typeScriptReadmeFilePaths[i];

      const typeScriptReadmeFileContents: string = fs.readFileSync(typeScriptReadmeFilePath, 'utf8');
      const packageNames: string[] = getPackageNamesFromReadmeTypeScriptMdFileContents(typeScriptReadmeFileContents);

      if (contains(packageNames, args.package)) {
        foundPackage = true;

        packageFolderPath = getAbsolutePackageFolderPathFromReadmeFileContents(azureSDKForJSRepoRoot, typeScriptReadmeFileContents);
      }
    }

    if (!foundPackage) {
      _logger.log(`No package found with the name "${args.package}".`);
    }
  }

  return packageFolderPath;
}

gulp.task('default', () => {
  _logger.log('gulp build --package <package-name>');
  _logger.log('  --package');
  _logger.log('    NPM package to run "npm run build" on.');
  _logger.log();
  _logger.log('gulp install --package <package name>');
  _logger.log('  --package');
  _logger.log('    NPM package to run "npm install" on.');
  _logger.log();
  _logger.log('gulp codegen [--azure-rest-api-specs-root <azure-rest-api-specs root>] [--use <autorest.typescript root>] [--package <package name>]');
  _logger.log('  --azure-rest-api-specs-root');
  _logger.log('    Root location of the local clone of the azure-rest-api-specs-root repository.');
  _logger.log('  --use');
  _logger.log('    Root location of autorest.typescript repository. If this is not specified, then the latest installed generator for TypeScript will be used.');
  _logger.log('  --package');
  _logger.log('    NPM package to regenerate. If no package is specified, then all packages will be regenerated.');
  _logger.log();
  _logger.log('gulp publish [--package <package name>] [--whatif]');
  _logger.log('  --package');
  _logger.log('    The name of the package to publish. If no package is specified, then all packages will be published.');
  _logger.log('  --whatif');
  _logger.log('    Don\'t actually publish packages, but just indicate which packages would be published.');
});

gulp.task("install", () => {
  const packageFolderPath: string | undefined = getPackageFolderPathFromPackageArgument();
  if (packageFolderPath) {
    _logger.logWithPath(packageFolderPath, "npm install");
    npmInstall(packageFolderPath);
  }
});

gulp.task("build", () => {
  const packageFolderPath: string | undefined = getPackageFolderPathFromPackageArgument();
  if (packageFolderPath) {
    _logger.logWithPath(packageFolderPath, "npm run build");
    npmRunBuild(packageFolderPath);
  }
});

// This task is used to generate libraries based on the mappings specified above.
gulp.task('codegen', async () => {
  _logger.log(`Passed arguments: ${process.argv}`);
  await generateSdk(azureRestAPISpecsRoot, azureSDKForJSRepoRoot, args.package);
});

gulp.task('publish', () => {
  const typeScriptReadmeFilePaths: string[] = findReadmeTypeScriptMdFilePaths(azureRestAPISpecsRoot);

  let errorPackages = 0;
  let upToDatePackages = 0;
  let publishedPackages = 0;
  let publishedPackagesSkipped = 0;

  for (let i = 0; i < typeScriptReadmeFilePaths.length; ++i) {
    const typeScriptReadmeFilePath: string = typeScriptReadmeFilePaths[i];
    _logger.logTrace(`INFO: Processing ${typeScriptReadmeFilePath}`);

    const typeScriptReadmeFileContents: string = fs.readFileSync(typeScriptReadmeFilePath, 'utf8');
    const packageFolderPath: string = getAbsolutePackageFolderPathFromReadmeFileContents(azureSDKForJSRepoRoot, typeScriptReadmeFileContents);
    if (!fs.existsSync(packageFolderPath)) {
      _logger.log(`ERROR: Package folder ${packageFolderPath} has not been generated.`);
      errorPackages++;
    }
    else {
      const packageJsonFilePath: string = `${packageFolderPath}/package.json`;
      if (!fs.existsSync(packageJsonFilePath)) {
        _logger.log(`ERROR: Package folder ${packageFolderPath} is missing its package.json file.`);
        errorPackages++;
      }
      else {
        const packageJson: { [propertyName: string]: any } = require(packageJsonFilePath);
        const packageName: string = packageJson.name;

        if (!args.package || args.package === packageName || endsWith(packageName, `-${args.package}`)) {
          const localPackageVersion: string = packageJson.version;
          if (!localPackageVersion) {
            _logger.log(`ERROR: "${packageJsonFilePath}" doesn't have a version specified.`);
            errorPackages++;
          }
          else {
            let npmPackageVersion: string;
            try {
              const npmViewResult: { [propertyName: string]: any } = JSON.parse(execSync(`npm view ${packageName} --json`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString());
              npmPackageVersion = npmViewResult['dist-tags']['latest'];
            }
            catch (error) {
              // This happens if the package doesn't exist in NPM.
            }

            if (localPackageVersion === npmPackageVersion) {
              upToDatePackages++;
            }
            else {
              _logger.log(`Publishing package "${packageName}" with version "${localPackageVersion}"...${args.whatif ? " (SKIPPED)" : ""}`);
              if (!args.whatif) {
                try {
                  npmInstall(packageFolderPath);
                  execSync(`npm publish`, { cwd: packageFolderPath });
                  publishedPackages++;
                }
                catch (error) {
                  errorPackages++;
                }
              } else {
                publishedPackagesSkipped++;
              }
            }
          }
        }
      }
    }
  }

  _logger.log();
  _logger.log(`Error packages:             ${errorPackages}`);
  _logger.log(`Up to date packages:        ${upToDatePackages}`);
  _logger.log(`Published packages:         ${publishedPackages}`);
  _logger.log(`Published packages skipped: ${publishedPackagesSkipped}`);
});

gulp.task("find-missing-sdks", async () => {
  try {
    _logger.log(`Passed arguments: ${process.argv}`);

    const azureRestApiSpecsRepositoryPath = await findAzureRestApiSpecsRepositoryPath();
    _logger.log(`Found azure-rest-api-specs repository in ${azureRestApiSpecsRepositoryPath}`);

    await findMissingSdks(azureRestApiSpecsRepositoryPath);
  } catch (error) {
    _logger.logError(error);
  }
});

gulp.task("generate-ts-readme", async () => {
  try {
    _logger.log(`Passed arguments: ${process.argv}`);
    await generateTsReadme(args.package, args.getSdkType());
  }
  catch (error) {
    _logger.logError(error);
  }
});

gulp.task("generate-missing-sdk", async () => {
  try {
    _logger.log(`Passed arguments: ${process.argv}`);
    await generateMissingSdk(azureSDKForJSRepoRoot, args.package, args.getSdkType());
  }
  catch (error) {
    _logger.logError(error);
  }
});

gulp.task("generate-all-missing-sdks", async () => {
  try {
    _logger.log(`Passed arguments: ${process.argv}`);
    const azureRestApiSpecsRepositoryPath = await findAzureRestApiSpecsRepositoryPath();
    await generateAllMissingSdks(azureSDKForJSRepoRoot, azureRestApiSpecsRepositoryPath);
  } catch (error) {
    _logger.logError(error);
  }
});

gulp.task("regenerate", async () => {
  try {
    const argv = commonArgv.options({
      "branch": {
        alias: "b",
        string: true,
        required: true,
        description: "Name of the AutoPR branch"
      },
      "package": {
        alias: "p",
        string: true,
        required: true,
        description: "Name of the regenerated package"
      },
      "repo-path": {
        string: true,
        default: __dirname,
        description: "Path to the azure-sdk-for-js repository"
      }
    }).usage("gulp regenerate --branch 'restapi_auto_daschult/sql'").argv;

    await regenerate(argv.branch, argv["repo-path"]);
  } catch (error) {

  }
});
