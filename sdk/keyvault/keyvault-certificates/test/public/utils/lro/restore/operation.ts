// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { OperationOptions } from "@azure/core-client";
import { KeyVaultCertificate, CertificatePollerOptions } from "../../../../../src";

/**
 * Options sent to the beginRestoreCertificateBackup method.
 */
export interface BeginRestoreCertificateBackupOptions extends CertificatePollerOptions {}

/**
 * @internal
 * An interface representing the CertificateClient. For internal use.
 */
export interface TestCertificateClientInterface {
  /**
   * Restores a backed up certificate, and all its versions, to a vault. This operation requires the
   * certificates/restore permission.
   */
  restoreCertificateBackup(
    backup: Uint8Array,
    options?: BeginRestoreCertificateBackupOptions
  ): Promise<KeyVaultCertificate>;
}

/**
 * An interface representing the state of the restore certificate's poll operation
 */
export interface RestoreCertificateBackupPollOperationState
  extends PollOperationState<KeyVaultCertificate> {
  /**
   * The backup of the certificate.
   */
  backup: Uint8Array;
  /**
   * Options for the core-http requests.
   */
  operationOptions?: OperationOptions;
  /**
   * An interface representing a CertificateClient. For internal use.
   */
  client: TestCertificateClientInterface;
}

/**
 * An interface representing a restore certificate's poll operation
 */
export interface RestoreCertificateBackupPollOperation
  extends PollOperation<RestoreCertificateBackupPollOperationState, KeyVaultCertificate> {}

/**
 * Reaches to the service and updates the restore certificate's poll operation.
 * @param options - The optional parameters, which are an abortSignal from \@azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: RestoreCertificateBackupPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: RestoreCertificateBackupPollOperationState) => void;
  } = {}
): Promise<RestoreCertificateBackupPollOperation> {
  const state = this.state;
  const { backup, client, operationOptions = {} } = state;

  if (options.abortSignal) {
    operationOptions.abortSignal = options.abortSignal;
  }

  if (!state.isStarted) {
    state.isStarted = true;
  }

  try {
    state.result = await client.restoreCertificateBackup(backup, operationOptions);
    state.isCompleted = true;
  } catch {
    // Nothing to do here.
  }

  return makeRestoreCertificateBackupPollOperation(state);
}

/**
 * @param options - The optional parameters, which is only an abortSignal from \@azure/abort-controller
 */
async function cancel(this: RestoreCertificateBackupPollOperation): Promise<never> {
  throw new Error("Canceling the restoration of a certificate is not supported.");
}

/**
 * Serializes the create certificate's poll operation
 */
function toString(this: RestoreCertificateBackupPollOperation): string {
  return JSON.stringify({
    state: this.state,
  });
}

/**
 * Builds a create certificate's poll operation
 * @param state - A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeRestoreCertificateBackupPollOperation(
  state: RestoreCertificateBackupPollOperationState
): RestoreCertificateBackupPollOperation {
  return {
    state: {
      ...state,
    },
    update,
    cancel,
    toString,
  };
}
