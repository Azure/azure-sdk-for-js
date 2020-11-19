// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { KeyVaultClient } from "../generated/keyVaultClient";

/**
 * Common parameters to a Key Vault Admin Poller.
 */
export interface KeyVaultAdminPollerOptions {
  vaultUrl: string;
  client: KeyVaultClient;
  requestOptions?: RequestOptionsBase;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * An interface representing the state of a Key Vault Admin Poller's operation.
 */
export interface KeyVaultAdminPollOperationState<TResult> extends PollOperationState<TResult> {
}

/**
 * Common properties and methods of the Key Vault Admin Pollers.
 */
export abstract class KeyVaultAdminPoller<TState, TResult> extends Poller<TState, TResult> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
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
 * Optional parameters to the KeyVaultAdminPollOperation
 */
export interface KeyVaultAdminPollOperationOptions {
  cancelMessage: string;
}

/**
 * Common properties and methods of the Key Vault Admin Poller operations.
 */
export class KeyVaultAdminPollOperation<TState, TResult> implements PollOperation<TState, TResult> {
  private cancelMessage: string;

  constructor(public state: TState, options: KeyVaultAdminPollOperationOptions) {
    this.cancelMessage = options.cancelMessage;
  }

  /**
   * Meant to reach to the service and update the Poller operation.
   */
  public async update(): Promise<PollOperation<TState, TResult>> {
    throw new Error("Operation not supported.");
  }

  /**
   * Meant to reach to the service and cancel the Poller operation.
   */
  public async cancel(): Promise<PollOperation<TState, TResult>> {
    throw new Error(this.cancelMessage);
  }

  /**
   * Serializes the Poller operation.
   */
  public toString(): string {
    return JSON.stringify({
      state: this.state
    });
  }
}
