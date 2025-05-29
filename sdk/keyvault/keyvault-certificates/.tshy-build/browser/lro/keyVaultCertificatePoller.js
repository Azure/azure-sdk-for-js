// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { delay } from "@azure/core-util";
import { Poller } from "@azure/core-lro";
/**
 * Generates a version of the state with only public properties. At least those common for all of the Key Vault Certificates pollers.
 */
export function cleanState(state) {
    return {
        certificateName: state.certificateName,
        isStarted: state.isStarted,
        isCancelled: state.isCancelled,
        isCompleted: state.isCompleted,
        error: state.error,
        result: state.result,
    };
}
/**
 * Common properties and methods of the Key Vault Certificate Pollers.
 */
export class KeyVaultCertificatePoller extends Poller {
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
        return delay(this.intervalInMs);
    }
    /**
     * Gets the public state of the polling operation
     */
    getOperationState() {
        return cleanState(this.operation.state);
    }
}
/**
 * Common properties and methods of the Key Vault Certificate Poller operations.
 */
export class KeyVaultCertificatePollOperation {
    constructor(state, options = {}) {
        this.state = state;
        this.cancelMessage = "";
        if (options.cancelMessage) {
            this.cancelMessage = options.cancelMessage;
        }
    }
    /**
     * Meant to reach to the service and update the Poller operation.
     */
    async update() {
        throw new Error("Operation not supported.");
    }
    /**
     * Meant to reach to the service and cancel the Poller operation.
     */
    async cancel() {
        throw new Error(this.cancelMessage);
    }
    /**
     * Serializes the create certificate's poll operation
     */
    toString() {
        return JSON.stringify({
            state: cleanState(this.state),
        });
    }
}
//# sourceMappingURL=keyVaultCertificatePoller.js.map