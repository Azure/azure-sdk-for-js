/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { contains, getArgument, gitDiff, GitDiffResult, gitStatus, GitStatusResult, joinPath, normalize, npmInstall, npmRun, NPMScope, NPMViewResult, RunOptions, StringMap } from "@ts-common/azure-js-dev-tools";
import * as fs from "fs";
import gulp from "gulp";
import * as path from "path";
import PluginError from "plugin-error";
import { Argv, CommandLineOptions, getCommandLineOptions } from "./.scripts/commandLine";
import { endsWith, getPackageFolderPaths, packagesToIgnore } from "./.scripts/common";
import { getDataFromPullRequest } from "./.scripts/github";
import { generateAllMissingSdks, generateMissingSdk, generateSdk, generateTsReadme, regenerate, setAutoPublish, setVersion } from "./.scripts/gulp";
import { Logger } from "./.scripts/logger";
import { findMissingSdks, findWrongPackages } from "./.scripts/packages";
import { getPackageFolderPathFromPackageArgument } from "./.scripts/readme";

enum PackagesToPack {
  All,
  DifferentVersion,
  BranchHasChanges
}

function getPackagesToPackArgument(toPackArgument: string | undefined): PackagesToPack {
  let result: PackagesToPack = PackagesToPack.BranchHasChanges;
  if (toPackArgument) {
    const toPackArgumentLower: string = toPackArgument.toLowerCase();
    for (const option in PackagesToPack) {
      if (option.toLowerCase() === toPackArgumentLower) {
        result = PackagesToPack[option] as any;
        break;
      }
    }
  }
  return result;
}

const args: CommandLineOptions = getCommandLineOptions();
const _logger: Logger = Logger.get();

const azureSDKForJSRepoRoot: string = getArgument("azure-sdk-for-js-repo-root", { defaultValue: __dirname })!;
const rawToPack: string | undefined = getArgument("to-pack");
let toPack: PackagesToPack = getPackagesToPackArgument(rawToPack);
const headReference: string | undefined = getArgument("head-reference", { environmentVariableName: "headReference" });
const baseReference: string | undefined = getArgument("base-reference", { environmentVariableName: "baseReference" });

function getDropFolderPath(): string {
  let result: string | undefined = getArgument("drop");
  if (!result) {
    result = "drop";
  }
  if (!path.isAbsolute(result)) {
    result = path.join(azureSDKForJSRepoRoot, result);
  }
  return result;
}

const dropFolderPath: string = getDropFolderPath();
if (!fs.existsSync(dropFolderPath)) {
  fs.mkdirSync(dropFolderPath);
}

gulp.task('default', async () => {
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
  _logger.log('gulp pack [--package <package name>] [--whatif] [--to-pack <to-pack option>] [--drop <drop folder path>]');
  _logger.log('  --package');
  _logger.log('    The name of the package to pack. If no package is specified, then all packages will be packed.');
  _logger.log('  --whatif');
  _logger.log('    Don\'t actually pack packages, but just indicate which packages would be packed.');
  _logger.log("  --to-pack");
  _logger.log(`    Which packages should be packed. Options are "All", "DifferentVersion", "BranchHasChanges".`);
  _logger.log(`  --drop`);
  _logger.log(`    The folder where packed tarballs will be put. Defaults to "<azure-sdk-for-js-root>/drop/".`);
});

gulp.task("install", async () => {
  _logger.log(`Passed arguments: ${Argv.print()}`);
  const argv: (Argv.PackageOptions & Argv.RepositoryOptions)
    = Argv.construct(Argv.Options.Package, Argv.Options.Repository)
      .usage("Example: gulp install --package @azure/arm-mariadb")
      .argv as any;

  const packageFolderPath: string | undefined = await getPackageFolderPathFromPackageArgument(
    argv.package,
    argv.azureRestAPISpecsRoot,
    argv.azureSDKForJSRepoRoot,
  );
  if (packageFolderPath) {
    npmInstall({ executionFolderPath: packageFolderPath });
  }
});

gulp.task("build", async () => {
  _logger.log(`Passed arguments: ${Argv.print()}`);
  const argv: (Argv.PackageOptions & Argv.RepositoryOptions)
    = Argv.construct(Argv.Options.Package, Argv.Options.Repository)
      .usage("Example: gulp build --package @azure/arm-mariadb")
      .argv as any;

  const packageFolderPath: string | undefined = await getPackageFolderPathFromPackageArgument(
    argv.package,
    argv.azureRestAPISpecsRoot,
    argv.azureSDKForJSRepoRoot,
  );
  if (packageFolderPath) {
    npmRun("build", { executionFolderPath: packageFolderPath });
  }
});

// This task is used to generate libraries based on the mappings specified above.
gulp.task('codegen', async () => {
  interface CodegenOptions {
    debugger: boolean | undefined;
    use: string | undefined;
  };

  _logger.log(`Passed arguments: ${Argv.print()}`);
  const argv: (CodegenOptions & Argv.PackageOptions & Argv.RepositoryOptions)
    = Argv.construct(Argv.Options.Package, Argv.Options.Repository)
      .options({
        "debugger": {
          boolean: true,
          alias: ["d", "use-debugger"],
          description: "Enables debugger attaching to autorest.typescript process"
        },
        "use": {
          string: true,
          description: "Specifies location for the generator to use"
        }
      })
      .usage("Example: gulp codegen --package @azure/arm-mariadb")
      .argv as any;

  await generateSdk(argv.azureRestAPISpecsRoot, argv.azureSDKForJSRepoRoot, argv.package, argv.use, argv.debugger);
});

function pack(): void {
  const runOptions: RunOptions = {
    log: (text: string) => _logger.logTrace(text),
    showCommand: true,
    showOutput: true
  };

  let errorPackages = 0;
  let upToDatePackages = 0;
  let packedPackages = 0;
  let skippedPackages = 0;

  const changedFiles: string[] = [];

  if (toPack === PackagesToPack.BranchHasChanges) {
    let packBaseReference: string | undefined = baseReference;
    if (!packBaseReference) {
      packBaseReference = "master";
      _logger.log(`No base-reference argument specified on command line or in environment variables. Defaulting to "${packBaseReference}".`);
    }

    let packHeadReference: string | undefined = headReference;
    if (!packHeadReference) {
      const statusResult: GitStatusResult = gitStatus(runOptions);
      packHeadReference = statusResult.localBranch!;
      _logger.log(`No head-reference argument specified on command line or in environment variables. Defaulting to "${packHeadReference}".`);

      const modifiedFiles: string[] | undefined = statusResult.modifiedFiles;
      if (modifiedFiles) {
        changedFiles.push(...modifiedFiles);
      }
    }

    if (packBaseReference === packHeadReference) {
      if (rawToPack) {
        _logger.logWarn(`The base-reference "${packBaseReference}" is equal to the head-reference "${packHeadReference}". This will result in nothing getting packed because there won't be any changes detected. Please change either the base or head-reference.`);
      } else {
        toPack = PackagesToPack.DifferentVersion;
        _logger.log(`The base-reference "${packBaseReference}" is equal to the head-reference "${packHeadReference}" which means there won't be any changes to pack. Switching "to-pack" to be "${PackagesToPack[toPack]}".`);
      }
    } else {
      const diffResult: GitDiffResult = gitDiff(packBaseReference, packHeadReference, runOptions);
      changedFiles.push(...diffResult.filesChanged);
      if (!changedFiles || changedFiles.length === 0) {
        _logger.logTrace(`Found no changes between "${packBaseReference}" and "${packHeadReference}".`);
      } else {
        _logger.logTrace(`Found the following changed files`)
        for (const changedFilePath of changedFiles) {
          _logger.logTrace(changedFilePath);
        }
      }
    }
  }

  const packageFolderRoot: string = path.resolve(__dirname, "sdk");
  _logger.logTrace(`INFO: Searching for package folders in ${packageFolderRoot}`);
  const packageFolderPaths: string[] | undefined = getPackageFolderPaths(packageFolderRoot);
  if (!packageFolderPaths) {
    _logger.logTrace(`INFO: The folder ${packageFolderPaths} doesn't exist.`);
  } else {
    for (const packageFolderPath of packageFolderPaths) {
      _logger.logTrace(`INFO: Processing ${packageFolderPath}`);

      const npm = new NPMScope({ executionFolderPath: packageFolderPath });
      const packageJsonFilePath: string = joinPath(packageFolderPath, "package.json");
      const packageJson: { [propertyName: string]: any } = require(packageJsonFilePath);
      const packageName: string = packageJson.name;

      if (packagesToIgnore.indexOf(packageName) !== -1) {
        _logger.log(`INFO: Skipping package ${packageName}`);
        ++skippedPackages;
      } else if (!args.package || args.package === packageName || endsWith(packageName, `-${args.package}`)) {
        const localPackageVersion: string = packageJson.version;
        if (!localPackageVersion) {
          _logger.log(`ERROR: "${packageJsonFilePath}" doesn't have a version specified.`);
          errorPackages++;
        }
        else {
          let shouldPack: boolean = false;

          if (toPack === PackagesToPack.All) {
            shouldPack = true;
          } else if (toPack === PackagesToPack.DifferentVersion) {
            let npmPackageVersion: string | undefined;
            try {
              const npmViewResult: NPMViewResult = npm.view({ packageName, ...runOptions, showCommand: false, showOutput: false });
              const distTags: StringMap<string> | undefined = npmViewResult["dist-tags"];
              npmPackageVersion = distTags && distTags["latest"];
            }
            catch (error) {
              // This happens if the package doesn't exist in NPM.
            }

            _logger.logTrace(`Local version: ${localPackageVersion}, NPM version: ${npmPackageVersion}`);
            shouldPack = localPackageVersion !== npmPackageVersion;
          } else if (toPack === PackagesToPack.BranchHasChanges) {
            const packageFolderPathWithSep: string = normalize(packageFolderPath + path.posix.sep);
            shouldPack = !!changedFiles && contains(changedFiles, (changedFilePath: string) => normalize(changedFilePath).startsWith(packageFolderPathWithSep));
          }

          if (!shouldPack) {
            upToDatePackages++;
          } else {
            _logger.log(`Packing package "${packageName}" with version "${localPackageVersion}"...${args.whatif ? " (SKIPPED)" : ""}`);
            if (!args.whatif) {
              try {
                npm.pack(runOptions);
                const packFileName = `${packageName.replace("/", "-").replace("@", "")}-${localPackageVersion}.tgz`
                const packFilePath = path.join(packageFolderPath, packFileName);
                fs.renameSync(packFilePath, path.join(dropFolderPath, packFileName));
                _logger.log(`Filename: ${packFileName}`);
                packedPackages++;
              }
              catch (error) {
                errorPackages++;
              }
            } else {
              skippedPackages++;
            }
          }
        }
      }
    }
  }


  function padLeft(value: number, minimumWidth: number, padCharacter: string = " "): string {
    let result: string = value.toString();
    while (result.length < minimumWidth) {
      result = padCharacter + result;
    }
    return result;
  }
  const minimumWidth: number = Math.max(errorPackages, upToDatePackages, packedPackages, skippedPackages).toString().length;
  _logger.log();
  _logger.log(`Error packages:      ${padLeft(errorPackages, minimumWidth)}`);
  _logger.log(`Up to date packages: ${padLeft(upToDatePackages, minimumWidth)}`);
  _logger.log(`Packed packages:     ${padLeft(packedPackages, minimumWidth)}`);
  _logger.log(`Skipped packages:    ${padLeft(skippedPackages, minimumWidth)}`);

  if (errorPackages !== 0) {
    throw new PluginError("pack", { message: "Some packages failed to pack." });
  }
}

gulp.task('pack', async () => pack());

gulp.task("find-missing-sdks", async () => {
  try {
    _logger.log(`Passed arguments: ${Argv.print()}`);
    const argv: Argv.RepositoryOptions
      = Argv.construct(Argv.Options.Repository)
        .usage("Example: gulp find-missing-sdks")
        .argv as any;

    const azureRestApiSpecsRepositoryPath = argv.azureRestAPISpecsRoot;
    _logger.log(`Found azure-rest-api-specs repository in ${azureRestApiSpecsRepositoryPath}`);

    await findMissingSdks(azureRestApiSpecsRepositoryPath);
  } catch (error) {
    _logger.logError(error);
  }
});

gulp.task("generate-readme", async () => {
  interface GenerateReadmeOptions {
    dir: string | undefined;
  };

  try {
    _logger.log(`Passed arguments: ${Argv.print()}`);
    const argv: (GenerateReadmeOptions & Argv.PackageOptions & Argv.RepositoryOptions)
      = Argv.construct(Argv.Options.Package, Argv.Options.Repository)
        .options({
          "spec-directory": {
            alias: "dir",
            description: "Forces generating readme in the specified directory"
          }
        })
        .usage("Example: gulp generate-readme --package @azure/arm-mariadb --type rm")
        .argv as any;

    await generateTsReadme(argv.package, argv.type, argv.azureRestAPISpecsRoot, argv.dir);
  }
  catch (error) {
    _logger.logError(error);
  }
});

gulp.task("generate-missing-sdk", async () => {
  try {
    _logger.log(`Passed arguments: ${Argv.print()}`);
    const argv: (Argv.PackageOptions & Argv.RepositoryOptions & Argv.GenerateOptions)
      = Argv.construct(Argv.Options.Package, Argv.Options.Repository, Argv.Options.Generate)
        .usage("gulp generate-missing-sdk --package @azure/arm-mariadb --type rm")
        .argv as any;

    await generateMissingSdk(argv.azureSDKForJSRepoRoot, argv.package, argv.type, argv.azureRestAPISpecsRoot, argv["skip-spec"], argv["skip-sdk"]);
  }
  catch (error) {
    _logger.logError(error);
  }
});

gulp.task("generate-all-missing-sdks", async () => {
  try {
    _logger.log(`Passed arguments: ${Argv.print()}`);
    const argv: (Argv.RepositoryOptions & Argv.GenerateOptions)
      = Argv.construct(Argv.Options.Repository, Argv.Options.Generate)
        .usage("Example: gulp find-missing-sdks")
        .argv as any;

    await generateAllMissingSdks(argv.azureSDKForJSRepoRoot, argv.azureRestAPISpecsRoot, argv["skip-spec"], argv["skip-sdk"]);
  } catch (error) {
    _logger.logError(error);
  }
});

gulp.task("regenerate", async () => {
  interface RegenerateOptions {
    branch: string | undefined;
    package: string | undefined;
    "pull-request": string | undefined;
    "skip-version-bump": boolean | undefined;
    "request-review": boolean | undefined;
  };

  const argv: (RegenerateOptions & Argv.RepositoryOptions)
    = Argv.construct(Argv.Options.Repository)
      .options({
        "branch": {
          alias: "b",
          string: true,
          description: "Name of the AutoPR branch",
          implies: "package"
        },
        "package": {
          alias: "p",
          string: true,
          description: "Name of the regenerated package"
        },
        "pull-request": {
          alias: "pr",
          string: true,
          description: "URL to GitHub pull request",
          conflicts: ["branch"]
        },
        "skip-version-bump": {
          boolean: true,
          description: "Determines if version bumping should be skipped"
        },
        "request-review": {
          boolean: true,
          description: "Determines if review should be automatically requested on matching pull request"
        }
      })
      .usage("Example: gulp regenerate --branch 'restapi_auto_daschult/sql'")
      .argv as any;

  try {
    const pullRequestUrl: string | undefined = argv["pull-request"];

    let pullRequestData: { packageName: string | undefined; branchName: string; prId: number; } | undefined;
    if (pullRequestUrl) {
      pullRequestData = await getDataFromPullRequest(pullRequestUrl);
    }

    if (!pullRequestData) {
      throw new Error(`Could not get pull request data for pull request "${pullRequestUrl}".`);
    }

    const branchName = argv.branch || pullRequestData.branchName;
    if (!branchName) {
      throw new Error("Unable to find the name of the branch. Please specify the --branch parameter");
    }

    const packageName: string | undefined = argv.package || pullRequestData.packageName;
    if (!packageName) {
      throw new Error("Unable to find the name of the package. Please specify the --package parameter");
    }

    regenerate(branchName, packageName, argv.azureSDKForJSRepoRoot, argv.azureRestAPISpecsRoot, pullRequestData.prId, argv["skip-version-bump"], argv["request-review"])
  } catch (error) {
    _logger.logError(error);
  }
});

gulp.task("find-wrong-packages", async () => {
  _logger.log(`Passed arguments: ${Argv.print()}`);
  const argv: (Argv.RepositoryOptions & Argv.GenerateOptions)
    = Argv.construct(Argv.Options.Repository, Argv.Options.Generate)
      .usage("Example: gulp find-missing-sdks")
      .argv as any;

  const incorrectPackages = await findWrongPackages(argv.azureRestAPISpecsRoot, argv.azureSDKForJSRepoRoot);

  _logger.log(`Found ${incorrectPackages.length} incorrect packages`.red);
  for (const incorrectPackage of incorrectPackages) {
    _logger.log(`${incorrectPackage.package.name}`.bgRed);
    _logger.log(`  Reason:      ${incorrectPackage.message}`);
    _logger.log(`  Output path: ${incorrectPackage.package.outputPath}`.gray);
    _logger.log(`  Readme path: ${incorrectPackage.package.readmePath}`.gray);
    _logger.log();
  }
});

gulp.task("set-autopublish", async () => {
  _logger.log(`Passed arguments: ${Argv.print()}`);
  const argv: Argv.RepositoryOptions & Argv.FilterOptions
    = Argv.construct(Argv.Options.Repository, Argv.Options.Filter)
      .usage("Example: gulp set-autopublish")
      .argv as any;

  await setAutoPublish(argv.azureSDKForJSRepoRoot, argv.include, argv.exclude || /@azure\/(keyvault|template|service-bus)/);
});

gulp.task("set-version", async () => {
  _logger.log(`Passed arguments: ${Argv.print()}`);
  const argv: Argv.RepositoryOptions & Argv.FilterOptions
    = Argv.construct(Argv.Options.Repository, Argv.Options.Filter)
      .usage("Example: gulp set-version")
      .argv as any;

  await setVersion(argv.azureSDKForJSRepoRoot, argv.include, argv.exclude || /@azure\/(keyvault|template|service-bus)/);
});
