"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCertificatePoller = void 0;
const operation_js_1 = require("./operation.js");
const keyVaultCertificatePoller_js_1 = require("../keyVaultCertificatePoller.js");
/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 * @internal
 */
class DeleteCertificatePoller extends keyVaultCertificatePoller_js_1.KeyVaultCertificatePoller {
    constructor(options) {
        const { client, certificateName, operationOptions, intervalInMs = 2000, resumeFrom } = options;
        let state;
        if (resumeFrom) {
            state = JSON.parse(resumeFrom).state;
        }
        const operation = new operation_js_1.DeleteCertificatePollOperation(Object.assign(Object.assign({}, state), { certificateName }), client, operationOptions);
        super(operation);
        this.intervalInMs = intervalInMs;
    }
}
exports.DeleteCertificatePoller = DeleteCertificatePoller;
//# sourceMappingURL=poller.js.map