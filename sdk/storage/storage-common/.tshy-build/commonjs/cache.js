"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedDefaultHttpClient = getCachedDefaultHttpClient;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
let _defaultHttpClient;
function getCachedDefaultHttpClient() {
    if (!_defaultHttpClient) {
        _defaultHttpClient = (0, core_rest_pipeline_1.createDefaultHttpClient)();
    }
    return _defaultHttpClient;
}
//# sourceMappingURL=cache.js.map