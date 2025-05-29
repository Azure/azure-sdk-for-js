"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyVaultSecretPollOperation = exports.KeyVaultSecretPoller = void 0;
const core_lro_1 = require("@azure/core-lro");
const core_util_1 = require("@azure/core-util");
/**
 * Common properties and methods of the Key Vault Secret Pollers.
 */
class KeyVaultSecretPoller extends core_lro_1.Poller {
    constructor() {
        super(...arguments);
        /**
         * Defines how much time the poller is going to wait before making a new request to the service.
         */
        this.intervalInMs = 2000;
    }
    /**
     * The method used by the poller to wait before attempting to update its operation.
     */
    async delay() {
        return (0, core_util_1.delay)(this.intervalInMs);
    }
}
exports.KeyVaultSecretPoller = KeyVaultSecretPoller;
/**
 * Common properties and methods of the Key Vault Secret Poller operations.
 */
// eslint-disable-next-next no-use-before-define
class KeyVaultSecretPollOperation {
    constructor(state, options = {}) {
        this.state = state;
        this.cancelMessage = "";
        if (options.cancelMessage) {
            this.cancelMessage = options.cancelMessage;
        }
    }
    /**
     * Meant to reach to the service and update the Poller operation.
     * @param options - The optional parameters, which is only an abortSignal from \@azure/abort-controller
     */
    async update() {
        throw new Error("Operation not supported.");
    }
    /**
     * Meant to reach to the service and cancel the Poller operation.
     * @param options - The optional parameters, which is only an abortSignal from \@azure/abort-controller
     */
    async cancel() {
        throw new Error(this.cancelMessage);
    }
    /**
     * Serializes the Poller operation.
     */
    toString() {
        return JSON.stringify({
            state: this.state,
        });
    }
}
exports.KeyVaultSecretPollOperation = KeyVaultSecretPollOperation;
//# sourceMappingURL=keyVaultSecretPoller.js.map