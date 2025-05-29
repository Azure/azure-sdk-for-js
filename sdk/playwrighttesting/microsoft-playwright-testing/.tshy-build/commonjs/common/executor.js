"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCustomerGlobalFunction = void 0;
const tslib_1 = require("tslib");
const node_path_1 = require("node:path");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const url_1 = tslib_1.__importDefault(require("url"));
const node_path_2 = tslib_1.__importDefault(require("node:path"));
const messages_js_1 = require("./messages.js");
const getPackageJsonPath = (folderPath) => {
    const packageJsonPath = node_path_2.default.join(folderPath, "package.json");
    if (node_fs_1.default.existsSync(packageJsonPath)) {
        return packageJsonPath;
    }
    const parentFolder = node_path_2.default.dirname(folderPath);
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
    const folder = node_path_2.default.dirname(file);
    return folderIsModule(folder);
};
const resolveFile = (id, rootDir) => {
    if (!id) {
        return undefined;
    }
    const localPath = node_path_2.default.resolve(rootDir, id);
    if (node_fs_1.default.existsSync(localPath)) {
        return localPath;
    }
    return require.resolve(id, { paths: [rootDir] });
};
const requireOrImportDefaultFunction = async (file) => {
    const fileName = (0, node_path_1.basename)(file);
    const isModule = fileIsModule(file);
    let func;
    if (isModule)
        func = await eval(`import(${JSON.stringify(url_1.default.pathToFileURL(file))})`);
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    else
        func = require(file);
    if (func && typeof func === "object" && "default" in func) {
        func = func.default;
    }
    if (typeof func !== "function") {
        // match playwright's error style
        const error = new Error(`${fileName}: ${messages_js_1.ServiceErrorMessageConstants.INVALID_GLOBAL_FUNCTION.message}`);
        error.stack = "";
        throw error;
    }
    return func;
};
const loadCustomerGlobalFunction = (rootDir, customerFunctionFileName) => {
    var _a;
    if (!customerFunctionFileName) {
        return null;
    }
    const file = node_path_2.default.resolve(rootDir, (_a = resolveFile(customerFunctionFileName, rootDir)) !== null && _a !== void 0 ? _a : "");
    return requireOrImportDefaultFunction(file);
};
exports.loadCustomerGlobalFunction = loadCustomerGlobalFunction;
//# sourceMappingURL=executor.js.map