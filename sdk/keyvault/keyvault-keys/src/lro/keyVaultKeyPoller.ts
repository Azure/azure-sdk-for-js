// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import { delay } from "@azure/core-util";
import type { PollOperation, PollOperationState } from "@azure/core-lro";
import { Poller } from "@azure/core-lro";
import type { KeyVaultClient } from "../keyVaultClient.js";

/**
 * Common parameters to a Key Vault Key Poller.
 */
export interface KeyVaultKeyPollerOptions {
  client: KeyVaultClient;
  name: string;
  operationOptions?: OperationOptions;
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
export abstract class KeyVaultKeyPoller<
  TState extends KeyVaultKeyPollOperationState<TResult>,
  TResult,
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
 * Optional parameters to the KeyVaultKeyPollOperation
 */
export interface KeyVaultKeyPollOperationOptions {
  cancelMessage?: string;
}

/**
 * Common properties and methods of the Key Vault Key Poller operations.
 */
export class KeyVaultKeyPollOperation<TState, TResult> implements PollOperation<TState, TResult> {
  private cancelMessage: string = "";

  constructor(
    public state: TState,
    options: KeyVaultKeyPollOperationOptions = {},
  ) {
    if (options.cancelMessage) {
      this.cancelMessage = options.cancelMessage;
    }
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
      state: this.state,
    });
  }
}
