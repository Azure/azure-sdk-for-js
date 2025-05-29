"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverDeletedCertificatePollOperation = void 0;
const tracing_js_1 = require("../../tracing.js");
const transformations_js_1 = require("../../transformations.js");
const keyVaultCertificatePoller_js_1 = require("../keyVaultCertificatePoller.js");
/**
 * An interface representing the recovery of a deleted certificate's poll operation
 */
class RecoverDeletedCertificatePollOperation extends keyVaultCertificatePoller_js_1.KeyVaultCertificatePollOperation {
    constructor(state, client, operationOptions = {}) {
        super(state, {
            cancelMessage: "Canceling the recovery of a deleted certificate is not supported.",
        });
        this.state = state;
        this.client = client;
        this.operationOptions = operationOptions;
    }
    /**
     * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
     */
    getCertificate(certificateName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("RecoverDeletedCertificatePoller.getCertificate", options, async (updatedOptions) => {
            const result = await this.client.getCertificate(certificateName, "", updatedOptions);
            return (0, transformations_js_1.getCertificateWithPolicyFromCertificateBundle)(result);
        });
    }
    /**
     * Recovers the deleted certificate in the specified vault. This operation can only be performed on a soft-delete enabled vault. This operation
     * requires the certificate/recover permission.
     */
    recoverDeletedCertificate(certificateName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("RecoverDeletedCertificatePoller.recoverDeletedCertificate", options, async (updatedOptions) => {
            const response = await this.client.recoverDeletedCertificate(certificateName, updatedOptions);
            return (0, transformations_js_1.getCertificateWithPolicyFromCertificateBundle)(response);
        });
    }
    /**
     * Reaches to the service and updates the poll operation.
     */
    async update(options = {}) {
        const state = this.state;
        const { certificateName } = state;
        if (options.abortSignal) {
            this.operationOptions.abortSignal = options.abortSignal;
        }
        if (!state.isStarted) {
            try {
                state.result = await this.getCertificate(certificateName, this.operationOptions);
                state.isCompleted = true;
            }
            catch (e) {
                // getCertificate will only work once the LRO is completed.
            }
            if (!state.isCompleted) {
                state.result = await this.recoverDeletedCertificate(certificateName, this.operationOptions);
                state.isStarted = true;
            }
        }
        if (!state.isCompleted) {
            try {
                state.result = await this.getCertificate(certificateName, this.operationOptions);
                state.isCompleted = true;
            }
            catch (error) {
                if (error.statusCode === 403) {
                    // At this point, the resource exists but the user doesn't have access to it.
                    state.isCompleted = true;
                }
                else if (error.statusCode !== 404) {
                    state.error = error;
                    state.isCompleted = true;
                    throw error;
                }
            }
        }
        return this;
    }
}
exports.RecoverDeletedCertificatePollOperation = RecoverDeletedCertificatePollOperation;
//# sourceMappingURL=operation.js.map