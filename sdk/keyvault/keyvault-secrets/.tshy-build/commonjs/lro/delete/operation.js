"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSecretPollOperation = void 0;
const keyVaultSecretPoller_js_1 = require("../keyVaultSecretPoller.js");
const transformations_js_1 = require("../../transformations.js");
const tracing_js_1 = require("../../tracing.js");
/**
 * An interface representing a delete secret's poll operation
 */
class DeleteSecretPollOperation extends keyVaultSecretPoller_js_1.KeyVaultSecretPollOperation {
    constructor(state, client, operationOptions = {}) {
        super(state, { cancelMessage: "Canceling the deletion of a secret is not supported." });
        this.state = state;
        this.client = client;
        this.operationOptions = operationOptions;
    }
    /**
     * Sends a delete request for the given Key Vault Key's name to the Key Vault service.
     * Since the Key Vault Key won't be immediately deleted, we have {@link beginDeleteKey}.
     */
    deleteSecret(name, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DeleteSecretPoller.deleteSecret", options, async (updatedOptions) => {
            const response = await this.client.deleteSecret(name, updatedOptions);
            return (0, transformations_js_1.getSecretFromSecretBundle)(response);
        });
    }
    /**
     * The getDeletedSecret method returns the specified deleted secret along with its properties.
     * This operation requires the secrets/get permission.
     */
    getDeletedSecret(name, options = {}) {
        return tracing_js_1.tracingClient.withSpan("DeleteSecretPoller.getDeletedSecret", options, async (updatedOptions) => {
            const response = await this.client.getDeletedSecret(name, updatedOptions);
            return (0, transformations_js_1.getSecretFromSecretBundle)(response);
        });
    }
    /**
     * Reaches to the service and updates the delete secret's poll operation.
     */
    async update(options = {}) {
        const state = this.state;
        const { name } = state;
        if (options.abortSignal) {
            this.operationOptions.abortSignal = options.abortSignal;
        }
        if (!state.isStarted) {
            const deletedSecret = await this.deleteSecret(name, this.operationOptions);
            state.isStarted = true;
            state.result = deletedSecret;
            if (!deletedSecret.properties.recoveryId) {
                state.isCompleted = true;
            }
        }
        if (!state.isCompleted) {
            try {
                state.result = await this.getDeletedSecret(name, this.operationOptions);
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
exports.DeleteSecretPollOperation = DeleteSecretPollOperation;
//# sourceMappingURL=operation.js.map