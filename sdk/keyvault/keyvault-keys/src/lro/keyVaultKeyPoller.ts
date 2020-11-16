// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { KeyVaultClient } from "../generated/keyVaultClient";

/**
 * Common parameters to a Key Vault Key Poller.
 */
export interface KeyVaultKeyPollerOptions {
  vaultUrl: string;
  client: KeyVaultClient;
  name: string;
  requestOptions?: RequestOptionsBase;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * An interface representing the state of a Key Vault Key Poller's operation.
 */
export interface KeyVaultKeyPollOperationState<TResult> extends PollOperationState<TResult> {
  /**
   * The name of the key.
   */
  name: string;
}

/**
 * Common properties and methods of the Key Vault Key Pollers.
 */
export abstract class KeyVaultKeyPoller<TState, TResult> extends Poller<TState, TResult> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof DeleteKeyPoller
   */
  public intervalInMs: number = 2000;

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof DeleteKeyPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}

/**
 * Optional parameters to the KeyVaultKeyPollOperation
 */
export interface KeyVaultKeyPollOperationOptions {
  cancelMessage: string;
}

/**
 * Common properties and methods of the Key Vault Key Poller operations.
 */
export class KeyVaultKeyPollOperation<TState, TResult> implements PollOperation<TState, TResult> {
  private cancelMessage: string;

  constructor(public state: TState, options: KeyVaultKeyPollOperationOptions) {
    this.cancelMessage = options.cancelMessage;
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
   * @summary Serializes the Poller operation.
   */
  public toString(): string {
    return JSON.stringify({
      state: this.state
    });
  }
}
