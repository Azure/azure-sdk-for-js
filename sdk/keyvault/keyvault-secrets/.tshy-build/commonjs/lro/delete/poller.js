"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSecretPoller = void 0;
const operation_js_1 = require("./operation.js");
const keyVaultSecretPoller_js_1 = require("../keyVaultSecretPoller.js");
/**
 * Class that creates a poller that waits until a secret finishes being deleted.
 */
class DeleteSecretPoller extends keyVaultSecretPoller_js_1.KeyVaultSecretPoller {
    constructor(options) {
        const { client, name, operationOptions, intervalInMs = 2000, resumeFrom } = options;
        let state;
        if (resumeFrom) {
            state = JSON.parse(resumeFrom).state;
        }
        const operation = new operation_js_1.DeleteSecretPollOperation(Object.assign(Object.assign({}, state), { name }), client, operationOptions);
        super(operation);
        this.intervalInMs = intervalInMs;
    }
}
exports.DeleteSecretPoller = DeleteSecretPoller;
//# sourceMappingURL=poller.js.map