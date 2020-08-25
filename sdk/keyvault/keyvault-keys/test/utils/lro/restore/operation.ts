// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { RequestOptionsBase } from "@azure/core-http";
import { KeyVaultKey, KeyPollerOptions } from "../../../../src/keysModels";

/**
 * Options sent to the beginRestoreKeyBackup method.
 */
export interface BeginRestoreKeyBackupOptions extends KeyPollerOptions {}

/**
 * @internal
 * @ignore
 * An interface representing the KeyClient. For internal use.
 */
export interface TestKeyClientInterface {
  /**
   * Restores a backed up key, and all its versions, to a vault. This operation requires the
   * keys/restore permission.
   */
  restoreKeyBackup(
    backup: Uint8Array,
    options?: BeginRestoreKeyBackupOptions
  ): Promise<KeyVaultKey>;
}

/**
 * An interface representing the state of the restore key's poll operation
 */
export interface RestoreKeyBackupPollOperationState extends PollOperationState<KeyVaultKey> {
  /**
   * The backup of the key.
   */
  backup: Uint8Array;
  /**
   * Options for the core-http requests.
   */
  requestOptions?: RequestOptionsBase;
  /**
   * An interface representing a KeyClient. For internal use.
   */
  client: TestKeyClientInterface;
}

/**
 * An interface representing a restore key's poll operation
 */
export interface RestoreKeyBackupPollOperation
  extends PollOperation<RestoreKeyBackupPollOperationState, KeyVaultKey> {}

/**
 * @summary Reaches to the service and updates the restore key's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: RestoreKeyBackupPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: RestoreKeyBackupPollOperationState) => void;
  } = {}
): Promise<RestoreKeyBackupPollOperation> {
  const state = this.state;
  const { backup, client, requestOptions = {} } = state;

  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  if (!state.isStarted) {
    state.isStarted = true;
  }

  try {
    state.result = await client.restoreKeyBackup(backup, { requestOptions });
    state.isCompleted = true;
  } catch {
    // Nothing to do here.
  }

  return makeRestoreKeyBackupPollOperation(state);
}

/**
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(this: RestoreKeyBackupPollOperation): Promise<never> {
  throw new Error("Canceling the restoration of a key is not supported.");
}

/**
 * @summary Serializes the create key's poll operation
 */
function toString(this: RestoreKeyBackupPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a create key's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeRestoreKeyBackupPollOperation(
  state: RestoreKeyBackupPollOperationState
): RestoreKeyBackupPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
