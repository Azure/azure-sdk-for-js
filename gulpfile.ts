/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { contains, endsWith, npmInstall, npmRunBuild } from "./.scripts/common";
import { getCommandLineOptions } from "./.scripts/commandLine";
import { findAzureRestApiSpecsRepositoryPath, findMissingSdks } from "./.scripts/generateSdks";
import { generateTsReadme, generateSdk } from "./.scripts/gulp";
import { getPackageNamesFromReadmeTypeScriptMdFileContents, findReadmeTypeScriptMdFilePaths, getAbsolutePackageFolderPathFromReadmeFileContents } from "./.scripts/readme";
import { getLogger } from "./.scripts/logger";
import * as fs from "fs";
import * as gulp from "gulp";
import * as path from "path";
import { execSync } from "child_process";

const logger = getLogger();
const args = getCommandLineOptions();
const azureSDKForJSRepoRoot: string = __dirname;
const azureRestAPISpecsRoot: string = args["azure-rest-api-specs-root"] || path.resolve(azureSDKForJSRepoRoot, '..', 'azure-rest-api-specs');

function getPackageFolderPathFromPackageArgument(): string | undefined {
  let packageFolderPath: string | undefined;

  if (!args.package) {
    console.log(`No --package specified.`);
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
      console.log(`No package found with the name "${args.package}".`);
    }
  }

  return packageFolderPath;
}

gulp.task('default', () => {
  console.log('gulp build --package <package-name>');
  console.log('  --package');
  console.log('    NPM package to run "npm run build" on.');
  console.log();
  console.log('gulp install --package <package name>');
  console.log('  --package');
  console.log('    NPM package to run "npm install" on.');
  console.log();
  console.log('gulp codegen [--azure-rest-api-specs-root <azure-rest-api-specs root>] [--use <autorest.typescript root>] [--package <package name>]');
  console.log('  --azure-rest-api-specs-root');
  console.log('    Root location of the local clone of the azure-rest-api-specs-root repository.');
  console.log('  --use');
  console.log('    Root location of autorest.typescript repository. If this is not specified, then the latest installed generator for TypeScript will be used.');
  console.log('  --package');
  console.log('    NPM package to regenerate. If no package is specified, then all packages will be regenerated.');
  console.log();
  console.log('gulp publish [--package <package name>] [--whatif]');
  console.log('  --package');
  console.log('    The name of the package to publish. If no package is specified, then all packages will be published.');
  console.log('  --whatif');
  console.log('    Don\'t actually publish packages, but just indicate which packages would be published.');
});

gulp.task("install", () => {
  const packageFolderPath: string | undefined = getPackageFolderPathFromPackageArgument();
  if (packageFolderPath) {
    logger.logWithPath(packageFolderPath, "npm install");
    npmInstall(packageFolderPath);
  }
});

gulp.task("build", () => {
  const packageFolderPath: string | undefined = getPackageFolderPathFromPackageArgument();
  if (packageFolderPath) {
    logger.logWithPath(packageFolderPath, "npm run build");
    npmRunBuild(packageFolderPath);
  }
});

function containsPackageName(packageNames: string[], packageName: string): boolean {
  return contains(packageNames, packageName) ||
    contains(packageNames, `@azure/${packageName}`) ||
    contains(packageNames, `"${packageName}"`) ||
    contains(packageNames, `"@azure/${packageName}"`) ||
    contains(packageNames, `'${packageName}'`) ||
    contains(packageNames, `'@azure/${packageName}'`);
}

// This task is used to generate libraries based on the mappings specified above.
gulp.task('codegen', () => {
    console.log(`Passed arguments: ${process.argv}`);
    generateSdk(azureRestAPISpecsRoot, azureSDKForJSRepoRoot, args.package);
});

gulp.task('publish', () => {
  const typeScriptReadmeFilePaths: string[] = findReadmeTypeScriptMdFilePaths(azureRestAPISpecsRoot);

  let errorPackages = 0;
  let upToDatePackages = 0;
  let publishedPackages = 0;
  let publishedPackagesSkipped = 0;

  for (let i = 0; i < typeScriptReadmeFilePaths.length; ++i) {
    const typeScriptReadmeFilePath: string = typeScriptReadmeFilePaths[i];
    // console.log(`INFO: Processing ${typeScriptReadmeFilePath}`);

    const typeScriptReadmeFileContents: string = fs.readFileSync(typeScriptReadmeFilePath, 'utf8');
    const packageFolderPath: string = getAbsolutePackageFolderPathFromReadmeFileContents(azureSDKForJSRepoRoot, typeScriptReadmeFileContents);
    if (!fs.existsSync(packageFolderPath)) {
      console.log(`ERROR: Package folder ${packageFolderPath} has not been generated.`);
      errorPackages++;
    }
    else {
      const packageJsonFilePath: string = `${packageFolderPath}/package.json`;
      if (!fs.existsSync(packageJsonFilePath)) {
        console.log(`ERROR: Package folder ${packageFolderPath} is missing its package.json file.`);
        errorPackages++;
      }
      else {
        const packageJson: { [propertyName: string]: any } = require(packageJsonFilePath);
        const packageName: string = packageJson.name;

        if (!args.package || args.package === packageName || endsWith(packageName, `-${args.package}`)) {
          const localPackageVersion: string = packageJson.version;
          if (!localPackageVersion) {
            console.log(`ERROR: "${packageJsonFilePath}" doesn't have a version specified.`);
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
              console.log(`Publishing package "${packageName}" with version "${localPackageVersion}"...${args.whatif ? " (SKIPPED)" : ""}`);
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

  console.log();
  console.log(`Error packages:             ${errorPackages}`);
  console.log(`Up to date packages:        ${upToDatePackages}`);
  console.log(`Published packages:         ${publishedPackages}`);
  console.log(`Published packages skipped: ${publishedPackagesSkipped}`);
});

gulp.task("find-missing-sdks", async () => {
  try {
    console.log(`Passed arguments: ${process.argv}`);

    const azureRestApiSpecsRepository = await findAzureRestApiSpecsRepositoryPath();
    console.log(`Found azure-rest-api-specs repository in ${azureRestApiSpecsRepository}`);

    await findMissingSdks(azureRestApiSpecsRepository);
  } catch (error) {
    console.error(error);
  }
});

gulp.task("generate-ts-readme", async () => {
  try {
    console.log(`Passed arguments: ${process.argv}`);
    await generateTsReadme(args.package, args.getSdkType());
  }
  catch (error) {
    console.error(error);
  }
});
