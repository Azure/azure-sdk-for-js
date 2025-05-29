"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverDeletedCertificatePoller = void 0;
const operation_js_1 = require("./operation.js");
const keyVaultCertificatePoller_js_1 = require("../keyVaultCertificatePoller.js");
/**
 * Class that creates a poller that waits until a deleted certificate is fully recovered.
 */
class RecoverDeletedCertificatePoller extends keyVaultCertificatePoller_js_1.KeyVaultCertificatePoller {
    constructor(options) {
        const { client, certificateName, operationOptions, intervalInMs = 2000, resumeFrom } = options;
        let state;
        if (resumeFrom) {
            state = JSON.parse(resumeFrom).state;
        }
        const operation = new operation_js_1.RecoverDeletedCertificatePollOperation(Object.assign(Object.assign({}, state), { certificateName }), client, operationOptions);
        super(operation);
        this.intervalInMs = intervalInMs;
    }
}
exports.RecoverDeletedCertificatePoller = RecoverDeletedCertificatePoller;
//# sourceMappingURL=poller.js.map