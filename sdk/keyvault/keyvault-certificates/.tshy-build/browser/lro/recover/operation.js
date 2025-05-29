// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { tracingClient } from "../../tracing.js";
import { getCertificateWithPolicyFromCertificateBundle } from "../../transformations.js";
import { KeyVaultCertificatePollOperation } from "../keyVaultCertificatePoller.js";
/**
 * An interface representing the recovery of a deleted certificate's poll operation
 */
export class RecoverDeletedCertificatePollOperation extends KeyVaultCertificatePollOperation {
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
        return tracingClient.withSpan("RecoverDeletedCertificatePoller.getCertificate", options, async (updatedOptions) => {
            const result = await this.client.getCertificate(certificateName, "", updatedOptions);
            return getCertificateWithPolicyFromCertificateBundle(result);
        });
    }
    /**
     * Recovers the deleted certificate in the specified vault. This operation can only be performed on a soft-delete enabled vault. This operation
     * requires the certificate/recover permission.
     */
    recoverDeletedCertificate(certificateName, options = {}) {
        return tracingClient.withSpan("RecoverDeletedCertificatePoller.recoverDeletedCertificate", options, async (updatedOptions) => {
            const response = await this.client.recoverDeletedCertificate(certificateName, updatedOptions);
            return getCertificateWithPolicyFromCertificateBundle(response);
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
//# sourceMappingURL=operation.js.map