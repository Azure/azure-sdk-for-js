import type { OperationOptions } from "@azure-rest/core-client";
import type { PollOperation, PollOperationState } from "@azure/core-lro";
import { Poller } from "@azure/core-lro";
import type { KeyVaultClient } from "../generated/keyVaultClient.js";
/**
 * Common parameters to a Key Vault Secret Poller.
 */
export interface KeyVaultSecretPollerOptions {
    client: KeyVaultClient;
    name: string;
    operationOptions?: OperationOptions;
    intervalInMs?: number;
    resumeFrom?: string;
}
/**
 * An interface representing the state of a Key Vault Secret Poller's operation.
 */
export interface KeyVaultSecretPollOperationState<TResult> extends PollOperationState<TResult> {
    /**
     * The name of the secret.
     */
    name: string;
}
/**
 * Common properties and methods of the Key Vault Secret Pollers.
 */
export declare abstract class KeyVaultSecretPoller<TState extends KeyVaultSecretPollOperationState<TResult>, TResult> extends Poller<TState, TResult> {
    /**
     * Defines how much time the poller is going to wait before making a new request to the service.
     */
    intervalInMs: number;
    /**
     * The method used by the poller to wait before attempting to update its operation.
     */
    delay(): Promise<void>;
}
/**
 * Optional parameters to the KeyVaultSecretPollOperation
 */
export interface KeyVaultSecretPollOperationOptions {
    cancelMessage?: string;
}
/**
 * Common properties and methods of the Key Vault Secret Poller operations.
 */
export declare class KeyVaultSecretPollOperation<TState extends KeyVaultSecretPollOperationState<TResult>, TResult> implements PollOperation<TState, TResult> {
    state: TState;
    private cancelMessage;
    constructor(state: TState, options?: KeyVaultSecretPollOperationOptions);
    /**
     * Meant to reach to the service and update the Poller operation.
     * @param options - The optional parameters, which is only an abortSignal from \@azure/abort-controller
     */
    update(): Promise<PollOperation<TState, TResult>>;
    /**
     * Meant to reach to the service and cancel the Poller operation.
     * @param options - The optional parameters, which is only an abortSignal from \@azure/abort-controller
     */
    cancel(): Promise<PollOperation<TState, TResult>>;
    /**
     * Serializes the Poller operation.
     */
    toString(): string;
}
//# sourceMappingURL=keyVaultSecretPoller.d.ts.map