"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateOperationPollOperation = void 0;
const keyVaultCertificatePoller_js_1 = require("../keyVaultCertificatePoller.js");
const transformations_js_1 = require("../../transformations.js");
const tracing_js_1 = require("../../tracing.js");
/**
 * An interface representing the active operation of a certificate's creation,
 * which is represented locally as the "operation" of an active LRO Poller.
 */
class CertificateOperationPollOperation extends keyVaultCertificatePoller_js_1.KeyVaultCertificatePollOperation {
    constructor(state, client, operationOptions = {}) {
        super(state);
        this.state = state;
        this.client = client;
        this.operationOptions = operationOptions;
    }
    /**
     * Cancels a certificate creation operation that is already in progress. This operation requires the certificates/update permission.
     */
    cancelCertificateOperation(certificateName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("CertificateOperationPoller.cancelCertificateOperation", options, async (updatedOptions) => {
            const response = await this.client.updateCertificateOperation(certificateName, { cancellationRequested: true }, updatedOptions);
            return (0, transformations_js_1.getCertificateOperationFromCoreOperation)(certificateName, response);
        });
    }
    /**
     * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
     */
    getCertificate(certificateName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("CertificateOperationPoller.getCertificate", options, async (updatedOptions) => {
            const result = await this.client.getCertificate(certificateName, "", updatedOptions);
            return (0, transformations_js_1.getCertificateWithPolicyFromCertificateBundle)(result);
        });
    }
    /**
     * Gets the certificate operation.
     */
    getPlainCertificateOperation(certificateName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("CertificateOperationPoller.getPlainCertificateOperation", options, async (updatedOptions) => {
            const response = await this.client.getCertificateOperation(certificateName, updatedOptions);
            return (0, transformations_js_1.getCertificateOperationFromCoreOperation)(certificateName, response);
        });
    }
    /**
     * Reaches to the service and updates the poll operation.
     */
    async update(options = {}) {
        const state = this.state;
        const certificateName = state.certificateName;
        if (options.abortSignal) {
            this.operationOptions.abortSignal = options.abortSignal;
        }
        if (!state.isStarted) {
            state.isStarted = true;
            state.result = await this.getCertificate(certificateName, this.operationOptions);
            state.certificateOperation = await this.getPlainCertificateOperation(certificateName, this.operationOptions);
        }
        else if (!state.isCompleted) {
            state.certificateOperation = await this.getPlainCertificateOperation(certificateName, this.operationOptions);
        }
        if (state.certificateOperation && state.certificateOperation.status !== "inProgress") {
            state.isCompleted = true;
            state.result = await this.getCertificate(certificateName, this.operationOptions);
            if (state.certificateOperation.error) {
                state.error = new Error(state.certificateOperation.error.message);
            }
        }
        return this;
    }
    /**
     * Reaches to the service and cancels the certificate's operation, also updating the poll operation.
     */
    async cancel(options = {}) {
        const state = this.state;
        const certificateName = state.certificateName;
        if (options.abortSignal) {
            this.operationOptions.abortSignal = options.abortSignal;
        }
        state.certificateOperation = await this.cancelCertificateOperation(certificateName, this.operationOptions);
        this.state.isCancelled = true;
        return this;
    }
    /**
     * Serializes the certificate's poll operation
     */
    toString() {
        const state = Object.assign({ certificateOperation: this.state.certificateOperation }, (0, keyVaultCertificatePoller_js_1.cleanState)(this.state));
        return JSON.stringify({
            state,
        });
    }
}
exports.CertificateOperationPollOperation = CertificateOperationPollOperation;
//# sourceMappingURL=operation.js.map