"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
var node_path_1 = require("node:path");
exports.default = (0, config_1.defineConfig)({
    test: {
        alias: generateSrcAliases(5, (0, node_path_1.resolve)("./dist/esm")),
    },
});
function generateSrcAliases(maxDepth, targetPath) {
    var aliases = {};
    for (var depth = 1; depth <= maxDepth; depth++) {
        var relativePath = "../".repeat(depth) + "src";
        aliases[relativePath] = targetPath;
    }
    return aliases;
}
