// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { basename } from "node:path";
import fs from "node:fs";
import url from "url";
import path from "node:path";
import { ServiceErrorMessageConstants } from "./messages.js";
const getPackageJsonPath = (folderPath) => {
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
const folderIsModule = (folder) => {
    const packageJsonPath = getPackageJsonPath(folder);
    if (!packageJsonPath)
        return false;
    // Rely on `require` internal caching logic.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(packageJsonPath).type === "module";
};
const fileIsModule = (file) => {
    if (file.endsWith(".mjs") || file.endsWith(".mts"))
        return true;
    if (file.endsWith(".cjs") || file.endsWith(".cts"))
        return false;
    const folder = path.dirname(file);
    return folderIsModule(folder);
};
const resolveFile = (id, rootDir) => {
    if (!id) {
        return undefined;
    }
    const localPath = path.resolve(rootDir, id);
    if (fs.existsSync(localPath)) {
        return localPath;
    }
    return require.resolve(id, { paths: [rootDir] });
};
const requireOrImportDefaultFunction = async (file) => {
    const fileName = basename(file);
    const isModule = fileIsModule(file);
    let func;
    if (isModule)
        func = await eval(`import(${JSON.stringify(url.pathToFileURL(file))})`);
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    else
        func = require(file);
    if (func && typeof func === "object" && "default" in func) {
        func = func.default;
    }
    if (typeof func !== "function") {
        // match playwright's error style
        const error = new Error(`${fileName}: ${ServiceErrorMessageConstants.INVALID_GLOBAL_FUNCTION.message}`);
        error.stack = "";
        throw error;
    }
    return func;
};
export const loadCustomerGlobalFunction = (rootDir, customerFunctionFileName) => {
    var _a;
    if (!customerFunctionFileName) {
        return null;
    }
    const file = path.resolve(rootDir, (_a = resolveFile(customerFunctionFileName, rootDir)) !== null && _a !== void 0 ? _a : "");
    return requireOrImportDefaultFunction(file);
};
//# sourceMappingURL=executor.js.map