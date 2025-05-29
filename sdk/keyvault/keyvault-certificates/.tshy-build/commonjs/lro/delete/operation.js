"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCertificatePollOperation = void 0;
const keyVaultCertificatePoller_js_1 = require("../keyVaultCertificatePoller.js");
const transformations_js_1 = require("../../transformations.js");
const tracing_js_1 = require("../../tracing.js");
/**
 * An interface representing a delete certificate's poll operation
 */
class DeleteCertificatePollOperation extends keyVaultCertificatePoller_js_1.KeyVaultCertificatePollOperation {
    constructor(state, client, operationOptions = {}) {
        super(state, { cancelMessage: "Canceling the deletion of a certificate is not supported." });
        this.state = state;
        this.client = client;
        this.operationOptions = operationOptions;
    }
    /**
     * The DELETE operation applies to any certificate stored in Azure Key Vault. DELETE cannot be applied
     * to an individual version of a certificate. This operation requires the certificates/delete permission.
     */
    deleteCertificate(certificateName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DeleteCertificatePoller.deleteCertificate", options, async (updatedOptions) => {
            const response = await this.client.deleteCertificate(certificateName, updatedOptions);
            return (0, transformations_js_1.getDeletedCertificateFromDeletedCertificateBundle)(response);
        });
    }
    /**
     * Retrieves the deleted certificate information plus its attributes, such as retention interval, scheduled permanent deletion and the
     * current deletion recovery level. This operation requires the certificates/get permission.
     */
    async getDeletedCertificate(certificateName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DeleteCertificatePoller.getDeletedCertificate", options, async (updatedOptions) => {
            const response = await this.client.getDeletedCertificate(certificateName, updatedOptions);
            return (0, transformations_js_1.getDeletedCertificateFromDeletedCertificateBundle)(response);
        });
    }
    /**
     * Reaches to the service and updates the delete certificate's poll operation.
     */
    async update(options = {}) {
        const state = this.state;
        const { certificateName } = state;
        if (options.abortSignal) {
            this.operationOptions.abortSignal = options.abortSignal;
        }
        if (!state.isStarted) {
            const deletedCertificate = await this.deleteCertificate(certificateName, this.operationOptions);
            state.isStarted = true;
            state.result = deletedCertificate;
            if (!deletedCertificate.recoveryId) {
                state.isCompleted = true;
            }
        }
        if (!state.isCompleted) {
            try {
                state.result = await this.getDeletedCertificate(certificateName, this.operationOptions);
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
exports.DeleteCertificatePollOperation = DeleteCertificatePollOperation;
//# sourceMappingURL=operation.js.map