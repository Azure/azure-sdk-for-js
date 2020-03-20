import { checkEverything, contains, getArgument, getDefaultLogger, gitDiff, GitDiffResult, gitStatus, GitStatusResult, joinPath, Logger, normalize, resolvePath } from "@ts-common/azure-js-dev-tools";
import * as path from "path";
import { getPackageFolderPaths } from "./common";

const logger: Logger = getDefaultLogger();
const changedFiles: string[] = [];
let tmpChangedFiles = changedFiles;
let headReference: string | undefined = getArgument("head-reference", { environmentVariableName: "headReference" });
if (!headReference) {
  const statusResult: GitStatusResult = gitStatus();
  headReference = statusResult.localBranch!;
  logger.logInfo(`No head-reference argument specified on command line or in environment variables. Defaulting to "${headReference}".`);

  const modifiedFiles: string[] | undefined = statusResult.modifiedFiles;
  if (modifiedFiles) {
    tmpChangedFiles.push(...modifiedFiles);
  }
}

let baseReference: string | undefined = getArgument("base-reference", { environmentVariableName: "baseReference" });
if (!baseReference) {
  baseReference = "master";
  logger.logInfo(`No base-reference argument specified on command line or in environment variables. Defaulting to "${baseReference}".`);
}

if (baseReference !== headReference) {
  const diffResult: GitDiffResult = gitDiff(baseReference, headReference);
  
  tmpChangedFiles.push(...diffResult.filesChanged);
 

  if (!changedFiles || changedFiles.length === 0) {
    logger.logInfo(`Found no changes between "${baseReference}" and "${headReference}".`);
  } else {
    logger.logVerbose(`Found the following changed files`)
    changedFiles
    for (const changedFilePath of tmpChangedFiles) {
      logger.logVerbose(changedFilePath);
      const testExists = changedFilePath.indexOf("/test/");
      if(testExists > -1 || contains(changedFiles, changedFilePath)) {
        continue;
      }
      changedFiles.push(changedFilePath)
    }
  }
}

const repositoryFolderPath: string = resolvePath(__dirname, "..");
const packagesFolderPath: string = joinPath(repositoryFolderPath, "sdk");
const packageFolderPaths: string[] | undefined = getPackageFolderPaths(packagesFolderPath);

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
