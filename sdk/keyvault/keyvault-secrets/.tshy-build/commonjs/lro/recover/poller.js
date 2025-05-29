"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverDeletedSecretPoller = void 0;
const operation_js_1 = require("./operation.js");
const keyVaultSecretPoller_js_1 = require("../keyVaultSecretPoller.js");
/**
 * Class that deletes a poller that waits until a secret finishes being deleted
 */
class RecoverDeletedSecretPoller extends keyVaultSecretPoller_js_1.KeyVaultSecretPoller {
    constructor(options) {
        const { client, name, operationOptions, intervalInMs = 2000, resumeFrom } = options;
        let state;
        if (resumeFrom) {
            state = JSON.parse(resumeFrom).state;
        }
        const operation = new operation_js_1.RecoverDeletedSecretPollOperation(Object.assign(Object.assign({}, state), { name }), client, operationOptions);
        super(operation);
        this.intervalInMs = intervalInMs;
    }
}
exports.RecoverDeletedSecretPoller = RecoverDeletedSecretPoller;
//# sourceMappingURL=poller.js.map