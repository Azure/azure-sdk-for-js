"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = void 0;
exports.isLocalPath = isLocalPath;
const node_path_1 = require("node:path");
Object.defineProperty(exports, "normalize", { enumerable: true, get: function () { return node_path_1.normalize; } });
function isLocalPath(p) {
    return (0, node_path_1.isAbsolute)(p);
}
//# sourceMappingURL=path.js.map