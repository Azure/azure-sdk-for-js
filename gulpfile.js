/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

const gulp = require('gulp');
const args = require('yargs').argv;
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const execSync = require('child_process').execSync;

const azureSDKForJSRepoRoot = __dirname;
const azureRestAPISpecsRoot = args['azure-rest-api-specs-root'] || path.resolve(azureSDKForJSRepoRoot, '..', 'azure-rest-api-specs');
const package = args['package'];
const use = args['use'];
const whatif = args['whatif'];

function findReadmeTypeScriptMdFilePaths(azureRestAPISpecsRoot) {
  const specificationFolderPath = path.resolve(azureRestAPISpecsRoot, 'specification');
  return glob.sync('**/readme.typescript.md', { absolute: true, cwd: specificationFolderPath });
}

function getPackageNameFromReadmeTypeScriptMdFileContents(readmeTypeScriptMdFileContents) {
  return readmeTypeScriptMdFileContents.match(/package-name: (\S*)/)[1];
}

function getOutputFolderFromReadmeTypeScriptMdFileContents(readmeTypeScriptMdFileContents) {
  return readmeTypeScriptMdFileContents.match(/output-folder: (\S*)/)[1];
}

function npmInstall(packageFolderPath) {
  execSync(`npm install`, { cwd: packageFolderPath, stdio: ['ignore', 'ignore', 'pipe'] });
}

function getAbsolutePackageFolderPathFromReadmeFileContents(typeScriptReadmeFileContents) {
  const outputFolderPath = getOutputFolderFromReadmeTypeScriptMdFileContents(typeScriptReadmeFileContents);
  const outputFolderPathRelativeToAzureSDKForJSRepoRoot = outputFolderPath.substring('$(typescript-sdks-folder)/'.length);
  return path.resolve(azureSDKForJSRepoRoot, outputFolderPathRelativeToAzureSDKForJSRepoRoot);
}

gulp.task('default', function () {
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
  if (!package) {
    console.log(`No --package specified to run "npm install" on.`);
  } else {
    const typeScriptReadmeFilePaths = findReadmeTypeScriptMdFilePaths(azureRestAPISpecsRoot);

    let foundPackage = false;

    for (let i = 0; i < typeScriptReadmeFilePaths.length; ++i) {
      const typeScriptReadmeFilePath = typeScriptReadmeFilePaths[i];

      const typeScriptReadmeFileContents = fs.readFileSync(typeScriptReadmeFilePath, 'utf8');
      const packageName = getPackageNameFromReadmeTypeScriptMdFileContents(typeScriptReadmeFileContents);

      if (package === packageName || packageName.endsWith(`-${package}`)) {
        foundPackage = true;

        const packageFolderPath = getAbsolutePackageFolderPathFromReadmeFileContents(typeScriptReadmeFileContents);
        console.log(`[${packageFolderPath}]> npm install`);
        npmInstall(packageFolderPath);
      }
    }

    if (!foundPackage) {
      console.log(`No package found with the name "${package}".`);
    }
  }
});

//This task is used to generate libraries based on the mappings specified above.
gulp.task('codegen', () => {
  const typeScriptReadmeFilePaths = findReadmeTypeScriptMdFilePaths(azureRestAPISpecsRoot);

  for (let i = 0; i < typeScriptReadmeFilePaths.length; ++i) {
    const typeScriptReadmeFilePath = typeScriptReadmeFilePaths[i];

    const typeScriptReadmeFileContents = fs.readFileSync(typeScriptReadmeFilePath, 'utf8');
    const packageName = getPackageNameFromReadmeTypeScriptMdFileContents(typeScriptReadmeFileContents);

    if (!package || package === packageName || packageName.endsWith(`-${package}`)) {
      console.log(`>>>>>>>>>>>>>>>>>>> Start: "${packageName}" >>>>>>>>>>>>>>>>>>>>>>>>>`);

      const readmeFilePath = path.resolve(path.dirname(typeScriptReadmeFilePath), 'readme.md');

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

      try {
        console.log('Executing command:');
        console.log('------------------------------------------------------------');
        console.log(cmd);
        console.log('------------------------------------------------------------');
        const result = execSync(cmd, { encoding: 'utf8' });
        console.log('Output:');
        console.log(result);

        console.log('Installing dependencies...');
        const packageFolderPath = getAbsolutePackageFolderPathFromReadmeFileContents(typeScriptReadmeFileContents);
        npmInstall(packageFolderPath);
      } catch (err) {
        console.log('Error:');
        console.log(`An error occurred while generating client for package: "${packageName}":\n ${err.stderr}`);
      }

      console.log(`>>>>>>>>>>>>>>>>>>> End: "${packageName}" >>>>>>>>>>>>>>>>>>>>>>>>>`);
      console.log();
    }
  }
});

gulp.task('publish', () => {
  const typeScriptReadmeFilePaths = findReadmeTypeScriptMdFilePaths(azureRestAPISpecsRoot);

  let errorPackages = 0;
  let upToDatePackages = 0;
  let publishedPackages = 0;
  let publishedPackagesSkipped = 0;

  for (let i = 0; i < typeScriptReadmeFilePaths.length; ++i) {
    const typeScriptReadmeFilePath = typeScriptReadmeFilePaths[i];
    // console.log(`INFO: Processing ${typeScriptReadmeFilePath}`);

    const typeScriptReadmeFileContents = fs.readFileSync(typeScriptReadmeFilePath, 'utf8');
    const packageFolderPath = getAbsolutePackageFolderPathFromReadmeFileContents(typeScriptReadmeFileContents);
    if (!fs.existsSync(packageFolderPath)) {
      console.log(`ERROR: Package folder ${packageFolderPath} has not been generated.`);
      errorPackages++;
    }
    else {
      const packageJsonFilePath = `${packageFolderPath}/package.json`;
      if (!fs.existsSync(packageJsonFilePath)) {
        console.log(`ERROR: Package folder ${packageFolderPath} is missing its package.json file.`);
        errorPackages++;
      }
      else {
        const packageJson = require(packageJsonFilePath);
        const packageName = packageJson.name;

        if (!package || package === packageName || packageName.endsWith(`-${package}`)) {
          const localPackageVersion = packageJson.version;
          if (!localPackageVersion) {
            console.log(`ERROR: "${packageJsonFilePath}" doesn't have a version specified.`);
            errorPackages++;
          }
          else {
            let npmPackageVersion;
            try {
              const npmViewResult = JSON.parse(execSync(`npm view ${packageName} --json`, { stdio: ['pipe', 'pipe', 'ignore'] }));
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