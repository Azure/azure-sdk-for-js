/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { execSync } from "child_process";
import * as fs from "fs";
import * as glob from "glob";
import * as gulp from "gulp";
import * as path from "path";
import { argv } from "yargs";

const azureSDKForJSRepoRoot: string = __dirname;
const azureRestAPISpecsRoot: string = argv['azure-rest-api-specs-root'] || path.resolve(azureSDKForJSRepoRoot, '..', 'azure-rest-api-specs');
const packageArg: string = argv['package'];
const use: string = argv['use'];
const whatif: boolean = argv['whatif'];
const useDebugger: boolean = argv["debugger"];

function findReadmeTypeScriptMdFilePaths(azureRestAPISpecsRoot: string): string[] {
  // console.log(`Looking for "readme.typescript.md" files in "${azureRestAPISpecsRoot}"...`);
  const specificationFolderPath: string = path.resolve(azureRestAPISpecsRoot, 'specification');
  const readmeTypeScriptMdFilePaths: string[] = glob.sync('**/readme.typescript.md', { absolute: true, cwd: specificationFolderPath });
  if (readmeTypeScriptMdFilePaths) {
    for (let i = 0; i < readmeTypeScriptMdFilePaths.length; ++i) {
      const readmeTypeScriptMdFilePath: string = readmeTypeScriptMdFilePaths[i];
      // console.log(`  Found "${readmeTypeScriptMdFilePath}".`);
      if (readmeTypeScriptMdFilePath && !startsWith(readmeTypeScriptMdFilePath, specificationFolderPath)) {
        const resolvedReadmeTypeScriptMdFilePath: string = path.resolve(specificationFolderPath, readmeTypeScriptMdFilePath);
        // console.log(`    Updating to "${resolvedReadmeTypeScriptMdFilePath}".`);
        readmeTypeScriptMdFilePaths[i] = resolvedReadmeTypeScriptMdFilePath;
      }
    }
  }
  return readmeTypeScriptMdFilePaths;
}

function getPackageNameFromReadmeTypeScriptMdFileContents(readmeTypeScriptMdFileContents: string): string {
  return readmeTypeScriptMdFileContents.match(/package-name: (\S*)/)[1];
}

function getOutputFolderFromReadmeTypeScriptMdFileContents(readmeTypeScriptMdFileContents: string): string {
  return readmeTypeScriptMdFileContents.match(/output-folder: (\S*)/)[1];
}

function npmInstall(packageFolderPath: string): void {
  execSync(`npm install`, { cwd: packageFolderPath, stdio: ['ignore', 'ignore', 'pipe'] });
}

function getAbsolutePackageFolderPathFromReadmeFileContents(typeScriptReadmeFileContents: string): string {
  const outputFolderPath: string = getOutputFolderFromReadmeTypeScriptMdFileContents(typeScriptReadmeFileContents);
  const outputFolderPathRelativeToAzureSDKForJSRepoRoot: string = outputFolderPath.substring('$(typescript-sdks-folder)/'.length);
  return path.resolve(azureSDKForJSRepoRoot, outputFolderPathRelativeToAzureSDKForJSRepoRoot);
}

function startsWith(value: string, prefix: string): boolean {
  return value && prefix && value.indexOf(prefix) === 0;
}

function endsWith(value: string, suffix: string): boolean {
  return value && suffix && value.length >= suffix.length && value.lastIndexOf(suffix) === value.length - suffix.length;
}

gulp.task('default', () => {
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
  if (!packageArg) {
    console.log(`No --package specified to run "npm install" on.`);
  } else {
    const typeScriptReadmeFilePaths: string[] = findReadmeTypeScriptMdFilePaths(azureRestAPISpecsRoot);

    let foundPackage = false;

    for (let i = 0; i < typeScriptReadmeFilePaths.length; ++i) {
      const typeScriptReadmeFilePath: string = typeScriptReadmeFilePaths[i];

      const typeScriptReadmeFileContents: string = fs.readFileSync(typeScriptReadmeFilePath, 'utf8');
      const packageName: string = getPackageNameFromReadmeTypeScriptMdFileContents(typeScriptReadmeFileContents);

      if (packageArg === packageName || endsWith(packageName, `-${packageArg}`)) {
        foundPackage = true;

        const packageFolderPath: string = getAbsolutePackageFolderPathFromReadmeFileContents(typeScriptReadmeFileContents);
        console.log(`[${packageFolderPath}]> npm install`);
        npmInstall(packageFolderPath);
      }
    }

    if (!foundPackage) {
      console.log(`No package found with the name "${packageArg}".`);
    }
  }
});

// This task is used to generate libraries based on the mappings specified above.
gulp.task('codegen', () => {
  const typeScriptReadmeFilePaths: string[] = findReadmeTypeScriptMdFilePaths(azureRestAPISpecsRoot);

  for (let i = 0; i < typeScriptReadmeFilePaths.length; ++i) {
    const typeScriptReadmeFilePath: string = typeScriptReadmeFilePaths[i];

    const typeScriptReadmeFileContents: string = fs.readFileSync(typeScriptReadmeFilePath, 'utf8');
    const packageName: string = getPackageNameFromReadmeTypeScriptMdFileContents(typeScriptReadmeFileContents);
    // console.log(`In "${typeScriptReadmeFilePath}", found package name "${packageName}".`);

    if (!packageArg || packageArg === packageName || endsWith(packageName, `-${packageArg}`)) {
      console.log(`>>>>>>>>>>>>>>>>>>> Start: "${packageName}" >>>>>>>>>>>>>>>>>>>>>>>>>`);

      const readmeFilePath: string = path.resolve(path.dirname(typeScriptReadmeFilePath), 'readme.md');

      let cmd = `autorest --typescript --typescript-sdks-folder=${azureSDKForJSRepoRoot} --license-header=MICROSOFT_MIT_NO_VERSION ${readmeFilePath}`;
      if (use) {
        cmd += ` --use=${use}`;
      }
      else {
        const localAutorestTypeScriptFolderPath = path.resolve(azureSDKForJSRepoRoot, '..', 'autorest.typescript');
        if (fs.existsSync(localAutorestTypeScriptFolderPath) && fs.lstatSync(localAutorestTypeScriptFolderPath).isDirectory()) {
          cmd += ` --use=${localAutorestTypeScriptFolderPath}`;
        }
      }

      if (useDebugger) {
        cmd += `  --typescript.debugger`;
      }

      try {
        console.log('Executing command:');
        console.log('------------------------------------------------------------');
        console.log(cmd);
        console.log('------------------------------------------------------------');
        
        execSync(cmd, { encoding: "utf8", stdio: "inherit" });
        
        console.log('Installing dependencies...');
        const packageFolderPath: string = getAbsolutePackageFolderPathFromReadmeFileContents(typeScriptReadmeFileContents);
        npmInstall(packageFolderPath);
      } catch (err) {
        console.log('Error:');
        console.log(`An error occurred while generating client for package: "${packageName}":\n Stderr: "${err.stderr}"`);
      }

      console.log(`>>>>>>>>>>>>>>>>>>> End: "${packageName}" >>>>>>>>>>>>>>>>>>>>>>>>>`);
      console.log();
    }
  }
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
    const packageFolderPath: string = getAbsolutePackageFolderPathFromReadmeFileContents(typeScriptReadmeFileContents);
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

        if (!packageArg || packageArg === packageName || endsWith(packageName, `-${packageArg}`)) {
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
              console.log(`Publishing package "${packageName}" with version "${localPackageVersion}"...${whatif ? " (SKIPPED)" : ""}`);
              if (!whatif) {
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