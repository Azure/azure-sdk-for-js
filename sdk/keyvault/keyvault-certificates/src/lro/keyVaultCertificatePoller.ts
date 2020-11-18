// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { KeyVaultClient } from "../generated/keyVaultClient";

/**
 * Common parameters to a Key Vault Certificate Poller.
 */
export interface KeyVaultCertificatePollerOptions {
  certificateName: string;
  vaultUrl: string;
  client: KeyVaultClient;
  requestOptions?: RequestOptionsBase;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * An interface representing the state of a Key Vault Certificate Poller's operation.
 */
export interface KeyVaultCertificatePollOperationState<TResult> extends PollOperationState<TResult> {
  /**
   * The name of the certificate.
   */
  certificateName: string;
}

/**
 * Common properties and methods of the Key Vault Certificate Pollers.
 */
export abstract class KeyVaultCertificatePoller<TState extends KeyVaultCertificatePollOperationState<TResult>, TResult> extends Poller<TState, TResult> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number = 2000;

  /**
   * The method used by the poller to wait before attempting to update its operation.
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}

/**
 * Optional parameters to the KeyVaultCertificatePollOperation
 */
export interface KeyVaultCertificatePollOperationOptions {
  cancelMessage?: string;
}

export function cleanState<TState extends KeyVaultCertificatePollOperationState<TResult>, TResult>(state: TState): KeyVaultCertificatePollOperationState<TResult> {
  const cleanState: KeyVaultCertificatePollOperationState<TResult> = {
    certificateName: state.certificateName,
    isStarted: state.isStarted,
    isCancelled: state.isCancelled,
    isCompleted: state.isCompleted,
    error: state.error,
    result: state.result
  }
  return cleanState;
}

/**
 * Common properties and methods of the Key Vault Certificate Poller operations.
 */
export class KeyVaultCertificatePollOperation<TState extends KeyVaultCertificatePollOperationState<TResult>, TResult>
  implements PollOperation<TState, TResult> {
  private cancelMessage: string = "";

  constructor(public state: TState, options: KeyVaultCertificatePollOperationOptions = {}) {
    if (options.cancelMessage) {
      this.cancelMessage = options.cancelMessage;
    }
  }

  /**
   * @summary Meant to reach to the service and update the Poller operation.
   * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
   */
  public async update(): Promise<PollOperation<TState, TResult>> {
    throw new Error("Operation not supported.");
  }

  /**
   * @summary Meant to reach to the service and cancel the Poller operation.
   * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
   */
  public async cancel(): Promise<PollOperation<TState, TResult>> {
    throw new Error(this.cancelMessage);
  }

  /**
   * @summary Serializes the create certificate's poll operation
   * @internal
   */
  public toString(): string {
    return JSON.stringify({
      state: cleanState(this.state)
    });
  }
}
