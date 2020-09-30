// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { RequestOptionsBase } from "@azure/core-http";
import { SecretPollerOptions, SecretProperties } from "../../../../src/secretsModels";

/**
 * Options sent to the beginRestoreSecretBackup method.
 */
export interface BeginRestoreSecretBackupOptions extends SecretPollerOptions {}

/**
 * @internal
 * @ignore
 * An interface representing the SecretClient. For internal use.
 */
export interface TestSecretClientInterface {
  /**
   * Restores a backed up secret, and all its versions, to a vault. This operation requires the
   * secrets/restore permission.
   */
  restoreSecretBackup(
    backup: Uint8Array,
    options?: BeginRestoreSecretBackupOptions
  ): Promise<SecretProperties>;
}

/**
 * An interface representing the state of the restore secret's poll operation
 */
export interface RestoreSecretBackupPollOperationState
  extends PollOperationState<SecretProperties> {
  /**
   * The backup of the secret.
   */
  backup: Uint8Array;
  /**
   * Options for the core-http requests.
   */
  requestOptions?: RequestOptionsBase;
  /**
   * An interface representing a SecretClient. For internal use.
   */
  client: TestSecretClientInterface;
}

/**
 * An interface representing a restore secret's poll operation
 */
export interface RestoreSecretBackupPollOperation
  extends PollOperation<RestoreSecretBackupPollOperationState, SecretProperties> {}

/**
 * @summary Reaches to the service and updates the restore secret's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: RestoreSecretBackupPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: RestoreSecretBackupPollOperationState) => void;
  } = {}
): Promise<RestoreSecretBackupPollOperation> {
  const state = this.state;
  const { backup, client, requestOptions = {} } = state;

  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  if (!state.isStarted) {
    state.isStarted = true;
  }

  try {
    state.result = await client.restoreSecretBackup(backup, { requestOptions });
    state.isCompleted = true;
  } catch {
    // Nothing to do here.
  }

  return makeRestoreSecretBackupPollOperation(state);
}

/**
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(this: RestoreSecretBackupPollOperation): Promise<never> {
  throw new Error("Canceling the restoration of a secret is not supported.");
}

/**
 * @summary Serializes the create secret's poll operation
 */
function toString(this: RestoreSecretBackupPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a create secret's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeRestoreSecretBackupPollOperation(
  state: RestoreSecretBackupPollOperationState
): RestoreSecretBackupPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
