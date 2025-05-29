"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCertificatePoller = void 0;
const operation_js_1 = require("./operation.js");
const keyVaultCertificatePoller_js_1 = require("../keyVaultCertificatePoller.js");
/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 */
class CreateCertificatePoller extends keyVaultCertificatePoller_js_1.KeyVaultCertificatePoller {
    constructor(options) {
        const { client, certificateName, certificatePolicy, createCertificateOptions, operationOptions, intervalInMs = 2000, resumeFrom, } = options;
        let state;
        if (resumeFrom) {
            state = JSON.parse(resumeFrom).state;
        }
        const operation = new operation_js_1.CreateCertificatePollOperation(Object.assign(Object.assign({}, state), { certificateName,
            certificatePolicy,
            createCertificateOptions }), client, operationOptions);
        super(operation);
        this.intervalInMs = intervalInMs;
    }
}
exports.CreateCertificatePoller = CreateCertificatePoller;
//# sourceMappingURL=poller.js.map