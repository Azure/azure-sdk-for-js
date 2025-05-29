"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateOperationPoller = void 0;
const operation_js_1 = require("./operation.js");
const keyVaultCertificatePoller_js_1 = require("../keyVaultCertificatePoller.js");
/**
 * Class that creates a poller that waits until a certificate finishes being created
 */
class CertificateOperationPoller extends keyVaultCertificatePoller_js_1.KeyVaultCertificatePoller {
    constructor(options) {
        const { client, certificateName, operationOptions, intervalInMs = 2000, resumeFrom } = options;
        let state;
        if (resumeFrom) {
            state = JSON.parse(resumeFrom).state;
        }
        const operation = new operation_js_1.CertificateOperationPollOperation(Object.assign(Object.assign({}, state), { certificateName }), client, operationOptions);
        super(operation);
        this.intervalInMs = intervalInMs;
    }
    /**
     * Gets the public state of the polling operation
     */
    getOperationState() {
        return Object.assign(Object.assign({}, (0, keyVaultCertificatePoller_js_1.cleanState)(this.operation.state)), { certificateOperation: this.operation.state.certificateOperation });
    }
}
exports.CertificateOperationPoller = CertificateOperationPoller;
//# sourceMappingURL=poller.js.map