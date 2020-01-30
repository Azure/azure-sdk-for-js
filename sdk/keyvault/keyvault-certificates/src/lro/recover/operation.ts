// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { RequestOptionsBase } from "@azure/core-http";
import {
  KeyVaultCertificateWithPolicy,
  CertificateClientInterface
} from "../../certificatesModels";

/**
 * The public representation of the RecoverDeletedCertificatePoller operation state.
 */
export type RecoverDeletedCertificateState = PollOperationState<KeyVaultCertificateWithPolicy>;

/**
 * An interface representing the state of a delete certificate's poll operation
 * @internal
 */
export interface RecoverDeletedCertificatePollOperationState
  extends PollOperationState<KeyVaultCertificateWithPolicy> {
  /**
   * The name of the certificate.
   */
  certificateName: string;
  /**
   * Options for the core-http requests.
   */
  requestOptions?: RequestOptionsBase;
  /**
   * An interface representing a CertificateClient. For internal use.
   */
  client: CertificateClientInterface;
}

/**
 * An interface representing a delete certificate's poll operation
 * @internal
 */
export type RecoverDeletedCertificatePollOperation = PollOperation<
  RecoverDeletedCertificatePollOperationState,
  KeyVaultCertificateWithPolicy
>;

/**
 * @summary Reaches to the service and updates the delete certificate's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 * @internal
 */
async function update(
  this: RecoverDeletedCertificatePollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: RecoverDeletedCertificatePollOperationState) => void;
  } = {}
): Promise<RecoverDeletedCertificatePollOperation> {
  const state = this.state;
  const { certificateName, client } = state;

  const requestOptions = state.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  if (!state.isStarted) {
    try {
      state.result = await client.getCertificate(certificateName, { requestOptions });
      state.isCompleted = true;
    } catch (e) {
      // getCertificate will only work once the LRO is completed.
    }
    if (!state.isCompleted) {
      state.result = await client.recoverDeletedCertificate(certificateName, { requestOptions });
      state.isStarted = true;
    }
  }

  if (!state.isCompleted) {
    try {
      state.result = await client.getCertificate(certificateName, { requestOptions });
      state.isCompleted = true;
    } catch (error) {
      if (error.statusCode === 403) {
        // At this point, the resource exists but the user doesn't have access to it.
        state.isCompleted = true;
      } else if (error.statusCode !== 404) {
        state.error = error;
        state.isCompleted = true;
      }
    }
  }

  return makeRecoverDeletedCertificatePollOperation(state);
}

/**
 * @summary Reaches to the service and cancels the certificate's operation, also updating the certificate's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 * @internal
 */
async function cancel(): Promise<RecoverDeletedCertificatePollOperation> {
  throw new Error("Canceling the deletion of a certificate is not supported.");
}

/**
 * @summary Serializes the create certificate's poll operation
 * @internal
 */
function toString(this: RecoverDeletedCertificatePollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a create certificate's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 * @internal
 */
export function makeRecoverDeletedCertificatePollOperation(
  state: RecoverDeletedCertificatePollOperationState
): RecoverDeletedCertificatePollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
