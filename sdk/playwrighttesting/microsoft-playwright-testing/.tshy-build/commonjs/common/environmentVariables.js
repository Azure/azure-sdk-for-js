"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentVariables = void 0;
const node_crypto_1 = require("node:crypto");
const constants_js_1 = require("./constants.js");
class EnvironmentVariables {
    get accessToken() {
        return process.env["PLAYWRIGHT_SERVICE_ACCESS_TOKEN"];
    }
    constructor() {
        this.runName = process.env["_MPT_SERVICE_RUN_NAME"];
        this.runId = process.env[constants_js_1.InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
        this.correlationId = (0, node_crypto_1.randomUUID)();
    }
}
exports.EnvironmentVariables = EnvironmentVariables;
//# sourceMappingURL=environmentVariables.js.map