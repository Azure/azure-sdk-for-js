import { checkEverything, contains, fileExistsSync, getChildFolderPaths, getDefaultLogger, getName, gitDiff, GitDiffResult, gitStatus, GitStatusResult, joinPath, Logger, normalize, resolvePath } from "@ts-common/azure-js-dev-tools";
import * as path from "path";
import * as yargs from "yargs";

const logger: Logger = getDefaultLogger({ logVerbose: true });

function getArgument(argumentName: string, environmentVariableName?: string, defaultValue?: string): string | undefined {
  let rawArgument: string | string[] | undefined = yargs.argv[argumentName] || process.env[environmentVariableName || argumentName] || defaultValue;
  if (Array.isArray(rawArgument)) {
    rawArgument = rawArgument[rawArgument.length - 1];
  }
  return rawArgument;
}

const headReference: string | undefined = getArgument("head-reference", "headReference");
const baseReference: string | undefined = getArgument("base-reference", "baseReference");

const changedFiles: string[] = [];

let packBaseReference: string | undefined = baseReference;
if (!packBaseReference) {
  packBaseReference = "master";
  logger.logInfo(`No base-reference argument specified on command line or in environment variables. Defaulting to "${packBaseReference}".`);
}

let packHeadReference: string | undefined = headReference;
if (!packHeadReference) {
  const statusResult: GitStatusResult = gitStatus();
  packHeadReference = statusResult.localBranch!;
  logger.logInfo(`No head-reference argument specified on command line or in environment variables. Defaulting to "${packHeadReference}".`);

  const modifiedFiles: string[] | undefined = statusResult.modifiedFiles;
  if (modifiedFiles) {
    changedFiles.push(...modifiedFiles);
  }
}

if (packBaseReference !== packHeadReference) {
  const diffResult: GitDiffResult = gitDiff(packBaseReference, packHeadReference);
  changedFiles.push(...diffResult.filesChanged);
  if (!changedFiles || changedFiles.length === 0) {
    logger.logInfo(`Found no changes between "${packBaseReference}" and "${packHeadReference}".`);
  } else {
    logger.logVerbose(`Found the following changed files`)
    for (const changedFilePath of changedFiles) {
      logger.logVerbose(changedFilePath);
    }
  }
}

const folderNamesToIgnore: string[] = ["node_modules"];
const repositoryFolderPath: string = resolvePath(__dirname, "..");
const packagesFolderPath: string = joinPath(repositoryFolderPath, "packages");
const packageFolderPaths: string[] | undefined = getChildFolderPaths(packagesFolderPath, {
  recursive: true,
  condition: (folderPath: string) => fileExistsSync(joinPath(folderPath, "package.json")),
  folderCondition: (folderPath: string) => !contains(folderNamesToIgnore, getName(folderPath))
});

let exitCode: number = 0;
if (!packageFolderPaths) {
  logger.logError(`The packages folder (${packagesFolderPath}) doesn't exist.`);
} else {
  logger.logVerbose(`Found ${packageFolderPaths.length} package folders.`);
  for (const packageFolderPath of packageFolderPaths) {
    const packageFolderPathWithSep: string = normalize(packageFolderPath + path.posix.sep);
    const shouldCheck = !!changedFiles && contains(changedFiles, (changedFilePath: string) => normalize(changedFilePath).startsWith(packageFolderPathWithSep));
    if (shouldCheck) {
      exitCode += checkEverything({
        logger,
        checkPackageJsonVersionOptions: {
          startPath: packageFolderPath
        },
        checkForOnlyCallsOptions: {
          startPaths: packageFolderPath
        },
        checkForSkipCallsOptions: {
          startPaths: packageFolderPath
        }
      });
    }
  }
}
process.exitCode = exitCode;