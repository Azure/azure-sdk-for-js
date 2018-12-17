import { checkPackageJsonVersion, getAzureDevOpsLogger, getConsoleLogger, Logger } from "@ts-common/azure-js-dev-tools";
import * as yargs from "yargs";

const logger: Logger = yargs.argv["azure-devops"] ? getAzureDevOpsLogger() : getConsoleLogger();
process.exitCode = checkPackageJsonVersion(__dirname, logger);