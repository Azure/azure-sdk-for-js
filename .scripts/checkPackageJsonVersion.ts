import { checkPackageJsonVersion } from "@ts-common/azure-js-dev-tools";

process.exitCode = checkPackageJsonVersion(__dirname);