import { findPackageJsonFileSync, Logger, getDefaultLogger, PackageJson, readPackageJsonFileSync, getParentFolderPath, joinPath, fileExistsSync } from "@ts-common/azure-js-dev-tools";
import { readFileSync } from "fs";

export function checkConstantsVersion(): number {
  const logger: Logger = getDefaultLogger();
  let exitCode = 0;

  function error(text: string): void {
    logger.logError(text);
    exitCode = 1;
  }

  const packageJsonFilePath: string | undefined = findPackageJsonFileSync(__dirname);
  if (!packageJsonFilePath) {
    error("Could not find a package.json file.");
  } else {
    const packageJson: PackageJson = readPackageJsonFileSync(packageJsonFilePath);
    const packageVersion: string | undefined = packageJson.version;
    if (!packageVersion) {
      error(`Could not find a version property in ${packageJsonFilePath}.`);
    } else {
      const repositoryRootFolderPath: string = getParentFolderPath(packageJsonFilePath);
      const constantsTsFilePath: string = joinPath(repositoryRootFolderPath, "lib/util/constants.ts");
      if (!fileExistsSync(constantsTsFilePath)) {
        error(`${constantsTsFilePath} doesn't exist anymore. Where'd it go?`);
      } else {
        const constantsTsFileContents: string = readFileSync(constantsTsFilePath, { encoding: "utf8" });
        const regularExpressionString = `msRestVersion: "(.*)"`;
        const regularExpression = new RegExp(regularExpressionString);
        const match: RegExpMatchArray | null = constantsTsFileContents.match(regularExpression);
        if (!match) {
          error(`${constantsTsFilePath} doesn't contain a match for ${regularExpressionString}.`);
        } else if (match[1] !== packageVersion) {
          error(`Expected ${constantsTsFilePath} to contain an msRestVersion property with the value "${packageVersion}", but it was "${match[1]}" instead.`);
        } else {
          logger.logInfo(`${constantsTsFilePath} contained the correct value for msRestVersion ("${packageVersion}").`);
        }
      }
    }
  }

  process.exitCode = exitCode;

  return exitCode;
}

if (typeof require != undefined && require.main === module) {
  checkConstantsVersion();
}