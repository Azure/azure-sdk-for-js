"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCertificatePollOperation = void 0;
const keyVaultCertificatePoller_js_1 = require("../keyVaultCertificatePoller.js");
const transformations_js_1 = require("../../transformations.js");
const tracing_js_1 = require("../../tracing.js");
/**
 * An interface representing a create certificate's poll operation
 */
class CreateCertificatePollOperation extends keyVaultCertificatePoller_js_1.KeyVaultCertificatePollOperation {
    constructor(state, client, operationOptions = {}) {
        super(state);
        this.state = state;
        this.client = client;
        this.operationOptions = operationOptions;
    }
    /**
     * Creates a new certificate. If this is the first version, the certificate resource is created. This operation requires the certificates/create permission.
     */
    createCertificate(certificateName, certificatePolicy, options = {}) {
        return tracing_js_1.tracingClient.withSpan("CreateCertificatePoller.createCertificate", options, async (updatedOptions) => {
            const id = options.id;
            const certificateAttributes = (0, transformations_js_1.toCoreAttributes)(options);
            const corePolicy = (0, transformations_js_1.toCorePolicy)(id, certificatePolicy, certificateAttributes);
            const result = await this.client.createCertificate(certificateName, {
                certificatePolicy: corePolicy,
                certificateAttributes,
                tags: updatedOptions.tags,
                preserveCertOrder: updatedOptions.preserveCertificateOrder,
            }, updatedOptions);
            return (0, transformations_js_1.getCertificateWithPolicyFromCertificateBundle)(result);
        });
    }
    /**
     * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
     */
    getCertificate(certificateName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("CreateCertificatePoller.getCertificate", options, async (updatedOptions) => {
            const result = await this.client.getCertificate(certificateName, "", updatedOptions);
            return (0, transformations_js_1.getCertificateWithPolicyFromCertificateBundle)(result);
        });
    }
    /**
     * Gets the certificate operation.
     */
    getPlainCertificateOperation(certificateName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("CreateCertificatePoller.getPlainCertificateOperation", options, async (updatedOptions) => {
            const response = await this.client.getCertificateOperation(certificateName, Object.assign({}, updatedOptions));
            return (0, transformations_js_1.getCertificateOperationFromCoreOperation)(certificateName, response);
        });
    }
    /**
     * Cancels a certificate creation operation that is already in progress. This operation requires the certificates/update permission.
     */
    cancelCertificateOperation(certificateName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("CreateCertificatePoller.cancelCertificateOperation", options, async (updatedOptions) => {
            const response = await this.client.updateCertificateOperation(certificateName, { cancellationRequested: true }, updatedOptions);
            return (0, transformations_js_1.getCertificateOperationFromCoreOperation)(certificateName, response);
        });
    }
    /**
     * Reaches to the service and updates the create certificate's poll operation.
     */
    async update(options = {}) {
        const state = this.state;
        const { certificateName, certificatePolicy, createCertificateOptions } = state;
        if (options.abortSignal) {
            this.operationOptions.abortSignal = options.abortSignal;
            createCertificateOptions.abortSignal = options.abortSignal;
        }
        if (!state.isStarted) {
            state.isStarted = true;
            state.result = await this.createCertificate(certificateName, certificatePolicy, createCertificateOptions);
            this.state.certificateOperation = await this.getPlainCertificateOperation(certificateName, this.operationOptions);
        }
        else if (!state.isCompleted) {
            this.state.certificateOperation = await this.getPlainCertificateOperation(certificateName, this.operationOptions);
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
     * Reaches to the service and cancels the certificate's operation, also updating the certificate's poll operation
     */
    async cancel(options = {}) {
        const state = this.state;
        const { certificateName } = state;
        if (options.abortSignal) {
            this.operationOptions.abortSignal = options.abortSignal;
        }
        state.certificateOperation = await this.cancelCertificateOperation(certificateName, this.operationOptions);
        this.state.isCancelled = true;
        return this;
    }
}
exports.CreateCertificatePollOperation = CreateCertificatePollOperation;
//# sourceMappingURL=operation.js.map