// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { basename } from "path";
import fs from "fs";
import url from "url";
import path from "path";
import { ServiceErrorMessageConstants } from "./messages";

const getPackageJsonPath = (folderPath: string): string => {
  const packageJsonPath = path.join(folderPath, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    return packageJsonPath;
  }

  const parentFolder = path.dirname(folderPath);
  if (folderPath === parentFolder) {
    return "";
  }

  const result = getPackageJsonPath(parentFolder);
  return result;
};

const folderIsModule = (folder: string): boolean => {
  const packageJsonPath = getPackageJsonPath(folder);
  if (!packageJsonPath) return false;
  // Rely on `require` internal caching logic.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require(packageJsonPath).type === "module";
};

const fileIsModule = (file: string): boolean => {
  if (file.endsWith(".mjs") || file.endsWith(".mts")) return true;
  if (file.endsWith(".cjs") || file.endsWith(".cts")) return false;
  const folder = path.dirname(file);
  return folderIsModule(folder);
};

const resolveFile = (id: string | undefined, rootDir: string): string | undefined => {
  if (!id) {
    return undefined;
  }
  const localPath = path.resolve(rootDir, id);
  if (fs.existsSync(localPath)) {
    return localPath;
  }
  return require.resolve(id, { paths: [rootDir] });
};

const requireOrImportDefaultFunction = async (file: string): Promise<any> => {
  const fileName = basename(file);
  const isModule = fileIsModule(file);
  let func: any;
  if (isModule) func = await eval(`import(${JSON.stringify(url.pathToFileURL(file))})`);
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  else func = require(file);
  if (func && typeof func === "object" && "default" in func) {
    func = func.default;
  }
  if (typeof func !== "function") {
    // match playwright's error style
    const error = new Error(`${fileName}: ${ServiceErrorMessageConstants.INVALID_GLOBAL_FUNCTION}`);
    error.stack = "";
    throw error;
  }
  return func;
};

export const loadCustomerGlobalFunction = (
  rootDir: string,
  customerFunctionFileName?: string,
): any => {
  if (!customerFunctionFileName) {
    return null;
  }
  const file = path.resolve(rootDir, resolveFile(customerFunctionFileName, rootDir) ?? "");
  return requireOrImportDefaultFunction(file);
};
