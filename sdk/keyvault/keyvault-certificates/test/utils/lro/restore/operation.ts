// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { RequestOptionsBase } from "@azure/core-http";
import { KeyVaultCertificate, CertificatePollerOptions } from "../../../../src/certificatesModels";

/**
 * Options sent to the beginRestoreCertificateBackup method.
 */
export interface BeginRestoreCertificateBackupOptions extends CertificatePollerOptions {}

/**
 * @internal
 * @ignore
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
  requestOptions?: RequestOptionsBase;
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
 * @summary Reaches to the service and updates the restore certificate's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: RestoreCertificateBackupPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: RestoreCertificateBackupPollOperationState) => void;
  } = {}
): Promise<RestoreCertificateBackupPollOperation> {
  const state = this.state;
  const { backup, client, requestOptions = {} } = state;

  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  if (!state.isStarted) {
    state.isStarted = true;
  }

  try {
    state.result = await client.restoreCertificateBackup(backup, { requestOptions });
    state.isCompleted = true;
  } catch {
    // Nothing to do here.
  }

  return makeRestoreCertificateBackupPollOperation(state);
}

/**
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(this: RestoreCertificateBackupPollOperation): Promise<never> {
  throw new Error("Canceling the restoration of a certificate is not supported.");
}

/**
 * @summary Serializes the create certificate's poll operation
 */
function toString(this: RestoreCertificateBackupPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a create certificate's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeRestoreCertificateBackupPollOperation(
  state: RestoreCertificateBackupPollOperationState
): RestoreCertificateBackupPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
