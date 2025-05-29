"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverDeletedSecretPollOperation = void 0;
const keyVaultSecretPoller_js_1 = require("../keyVaultSecretPoller.js");
const transformations_js_1 = require("../../transformations.js");
const tracing_js_1 = require("../../tracing.js");
/**
 * An interface representing a delete secret's poll operation
 */
class RecoverDeletedSecretPollOperation extends keyVaultSecretPoller_js_1.KeyVaultSecretPollOperation {
    constructor(state, client, options = {}) {
        super(state, { cancelMessage: "Canceling the recovery of a deleted secret is not supported." });
        this.state = state;
        this.client = client;
        this.options = options;
    }
    /**
     * The getSecret method returns the specified secret along with its properties.
     * This operation requires the secrets/get permission.
     */
    getSecret(name, options = {}) {
        return tracing_js_1.tracingClient.withSpan("RecoverDeletedSecretPoller.getSecret", options, async (updatedOptions) => {
            const response = await this.client.getSecret(name, options && options.version ? options.version : "", updatedOptions);
            return (0, transformations_js_1.getSecretFromSecretBundle)(response);
        });
    }
    /**
     * The recoverDeletedSecret method recovers the specified deleted secret along with its properties.
     * This operation requires the secrets/recover permission.
     */
    recoverDeletedSecret(name, options = {}) {
        return tracing_js_1.tracingClient.withSpan("RecoverDeletedSecretPoller.recoverDeletedSecret", options, async (updatedOptions) => {
            const response = await this.client.recoverDeletedSecret(name, updatedOptions);
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
            this.options.abortSignal = options.abortSignal;
        }
        if (!state.isStarted) {
            try {
                state.result = (await this.getSecret(name, this.options)).properties;
                state.isCompleted = true;
            }
            catch (_a) {
                // Nothing to do here.
            }
            if (!state.isCompleted) {
                state.result = (await this.recoverDeletedSecret(name, this.options)).properties;
                state.isStarted = true;
            }
        }
        if (!state.isCompleted) {
            try {
                state.result = (await this.getSecret(name, this.options)).properties;
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
exports.RecoverDeletedSecretPollOperation = RecoverDeletedSecretPollOperation;
//# sourceMappingURL=operation.js.map