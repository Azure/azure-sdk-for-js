// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as babel from "@babel/core";
import { basename } from "path";
import fs from "fs";
import path from "path";
import cloneDeep from "lodash.clonedeep";
import { ServiceErrorMessageConstants } from "./messages";

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

const readFileContent = async (file: string): Promise<string> => {
  const fileBuffer = await fs.promises.readFile(file);
  return fileBuffer.toString();
};

const babelTransform = async (file: string): Promise<any> => {
  const fileContent = await readFileContent(file);
  const babelOptions = {
    cwd: path.resolve(__dirname, "../../"),
    filename: basename(file),
    configFile: path.resolve(__dirname, "../../", "./babel.config.json"),
  };
  const ast = await babel.parseAsync(fileContent, babelOptions);
  const transform = await babel.transformFromAstAsync(ast, fileContent, babelOptions);
  const originalExports = cloneDeep(exports);
  exports = cloneDeep({});
  const evaluationResponse = eval(transform.code);
  // If export is used in customer file
  if (Object.keys(exports).length > 0) {
    if (Object.keys(exports).length > 1) {
      return null;
    } // if more than 1 exports
    if (!exports.default) {
      return null;
    } // export object has key != default
    return exports.default;
  }
  exports = cloneDeep(originalExports);
  return evaluationResponse; // module.exports
};

const requireOrImportDefaultFunction = async (file: string): Promise<any> => {
  const fileName = basename(file);
  let func = await babelTransform(file);
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
  const file = path.resolve(rootDir, resolveFile(customerFunctionFileName, rootDir));
  return requireOrImportDefaultFunction(file);
};
