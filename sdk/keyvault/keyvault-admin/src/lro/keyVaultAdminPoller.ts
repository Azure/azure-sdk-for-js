// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperation, PollOperationState, Poller } from "@azure/core-lro";
import { KeyVaultClient } from "../generated/keyVaultClient";
import { OperationOptions } from "@azure/core-client";

/**
 * Common parameters to a Key Vault Admin Poller.
 */
export interface KeyVaultAdminPollerOptions {
  vaultUrl: string;
  client: KeyVaultClient;
  requestOptions?: OperationOptions;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * An interface representing the state of a Key Vault Admin Poller's operation.
 */
export interface KeyVaultAdminPollOperationState<TResult> extends PollOperationState<TResult> {
  /**
   * Identifier for the full restore operation.
   */
  jobId?: string;
  /**
   * Status of the restore operation.
   */
  status?: string;
  /**
   * The status details of restore operation.
   */
  statusDetails?: string;
  /**
   * The start time of the restore operation in UTC
   */
  startTime?: Date;
  /**
   * The end time of the restore operation in UTC
   */
  endTime?: Date;
}

/**
 * Generates a version of the state with only public properties. At least those common for all of the Key Vault Admin pollers.
 */
export function cleanState<TState extends KeyVaultAdminPollOperationState<TResult>, TResult>(
  state: TState
): KeyVaultAdminPollOperationState<TResult> {
  return {
    jobId: state.jobId,
    status: state.status,
    statusDetails: state.statusDetails,
    startTime: state.startTime,
    endTime: state.endTime,
    isStarted: state.isStarted,
    isCancelled: state.isCancelled,
    isCompleted: state.isCompleted,
    error: state.error,
    result: state.result,
  };
}

/**
 * Common properties and methods of the Key Vault Admin Pollers.
 */
export abstract class KeyVaultAdminPoller<
  TState extends KeyVaultAdminPollOperationState<TResult>,
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
    return new Promise((resolve) => setTimeout(resolve, this.intervalInMs));
  }

  /**
   * Gets the public state of the polling operation
   */
  public getOperationState(): TState {
    return cleanState(this.operation.state) as TState;
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
      state: cleanState(this.state),
    });
  }
}
