"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplates = getTemplates;
const glob_1 = require("glob");
const node_path_1 = require("node:path");
const sourceDir_js_1 = require("./sourceDir.js");
async function getTemplates(template) {
    const sharedFiles = await getFiles((0, node_path_1.join)(sourceDir_js_1.sourceDir, "..", "templates", "_shared", "**", "**", "*.*"));
    const templateFiles = await getFiles((0, node_path_1.join)(sourceDir_js_1.sourceDir, "..", "templates", template, "**", "**", "*.*"));
    return [...sharedFiles, ...templateFiles];
}
async function getFiles(path) {
    // Starting from glob v8 `\` is only used as an escape character, and never as a path separator in glob patterns.
    // Glob pattern paths must use forward-slashes as path separators.
    // See https://github.com/isaacs/node-glob/blob/af57da21c7722bb6edb687ccd4ad3b99d3e7a333/changelog.md#80
    const normalizedPath = path.replace(/\\/g, "/");
    return (0, glob_1.glob)(normalizedPath, { dot: true });
}
//# sourceMappingURL=getTemplates.js.map