// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, OperationOptions } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { KeyVaultClient } from "../generated/keyVaultClient";

/**
 * Common parameters to a Key Vault Secret Poller.
 */
export interface KeyVaultSecretPollerOptions {
  vaultUrl: string;
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
export abstract class KeyVaultSecretPoller<
  TState extends KeyVaultSecretPollOperationState<TResult>,
  TResult
> extends Poller<TState, TResult> {
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
 * Optional parameters to the KeyVaultSecretPollOperation
 */
export interface KeyVaultSecretPollOperationOptions {
  cancelMessage?: string;
}

/**
 * Common properties and methods of the Key Vault Secret Poller operations.
 */
// eslint-disable-next-next no-use-before-define
export class KeyVaultSecretPollOperation<
  TState extends KeyVaultSecretPollOperationState<TResult>,
  TResult
> implements PollOperation<TState, TResult>
{
  private cancelMessage: string = "";

  constructor(public state: TState, options: KeyVaultSecretPollOperationOptions = {}) {
    if (options.cancelMessage) {
      this.cancelMessage = options.cancelMessage;
    }
  }

  /**
   * Meant to reach to the service and update the Poller operation.
   * @param options - The optional parameters, which is only an abortSignal from \@azure/abort-controller
   */
  public async update(): Promise<PollOperation<TState, TResult>> {
    throw new Error("Operation not supported.");
  }

  /**
   * Meant to reach to the service and cancel the Poller operation.
   * @param options - The optional parameters, which is only an abortSignal from \@azure/abort-controller
   */
  public async cancel(): Promise<PollOperation<TState, TResult>> {
    throw new Error(this.cancelMessage);
  }

  /**
   * Serializes the Poller operation.
   */
  public toString(): string {
    return JSON.stringify({
      state: this.state,
    });
  }
}
