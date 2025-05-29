import type { OperationOptions } from "@azure-rest/core-client";
import type { PollOperation, PollOperationState } from "@azure/core-lro";
import { Poller } from "@azure/core-lro";
import type { KeyVaultClient } from "../generated/keyVaultClient.js";
/**
 * Common parameters to a Key Vault Certificate Poller.
 */
export interface KeyVaultCertificatePollerOptions {
    certificateName: string;
    vaultUrl: string;
    client: KeyVaultClient;
    operationOptions?: OperationOptions;
    intervalInMs?: number;
    resumeFrom?: string;
}
/**
 * An interface representing the public shape of the state of a Key Vault Certificate Poller's operations.
 */
export interface KeyVaultCertificatePollOperationState<TResult> extends PollOperationState<TResult> {
    /**
     * The name of the certificate.
     */
    certificateName: string;
}
/**
 * Generates a version of the state with only public properties. At least those common for all of the Key Vault Certificates pollers.
 */
export declare function cleanState<TState extends KeyVaultCertificatePollOperationState<TResult>, TResult>(state: TState): KeyVaultCertificatePollOperationState<TResult>;
/**
 * Common properties and methods of the Key Vault Certificate Pollers.
 */
export declare abstract class KeyVaultCertificatePoller<TState extends KeyVaultCertificatePollOperationState<TResult>, TResult> extends Poller<TState, TResult> {
    /**
     * Defines how much time the poller is going to wait before making a new request to the service.
     */
    intervalInMs: number;
    /**
     * The method used by the poller to wait before attempting to update its operation.
     */
    delay(): Promise<void>;
    /**
     * Gets the public state of the polling operation
     */
    getOperationState(): TState;
}
/**
 * Optional parameters to the KeyVaultCertificatePollOperation
 */
export interface KeyVaultCertificatePollOperationOptions {
    cancelMessage?: string;
}
/**
 * Common properties and methods of the Key Vault Certificate Poller operations.
 */
export declare class KeyVaultCertificatePollOperation<TState extends KeyVaultCertificatePollOperationState<TResult>, TResult> implements PollOperation<TState, TResult> {
    state: TState;
    private cancelMessage;
    constructor(state: TState, options?: KeyVaultCertificatePollOperationOptions);
    /**
     * Meant to reach to the service and update the Poller operation.
     */
    update(): Promise<PollOperation<TState, TResult>>;
    /**
     * Meant to reach to the service and cancel the Poller operation.
     */
    cancel(): Promise<PollOperation<TState, TResult>>;
    /**
     * Serializes the create certificate's poll operation
     */
    toString(): string;
}
//# sourceMappingURL=keyVaultCertificatePoller.d.ts.map