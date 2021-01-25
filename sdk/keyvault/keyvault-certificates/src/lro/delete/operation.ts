// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { RequestOptionsBase } from "@azure/core-http";
import { DeletedCertificate, CertificateClientInterface } from "../../certificatesModels";

/**
 * The public representation of the DeleteCertificatePoller operation state.
 */
export type DeleteCertificateState = PollOperationState<DeletedCertificate>;

/**
 * An interface representing the state of a delete certificate's poll operation
 * @internal
 */
export interface DeleteCertificatePollOperationState
  extends PollOperationState<DeletedCertificate> {
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
export type DeleteCertificatePollOperation = PollOperation<
  DeleteCertificatePollOperationState,
  DeletedCertificate
>;

/**
 * @summary Reaches to the service and updates the delete certificate's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 * @internal
 */
async function update(
  this: DeleteCertificatePollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: DeleteCertificatePollOperationState) => void;
  } = {}
): Promise<DeleteCertificatePollOperation> {
  const state = this.state;
  const { certificateName, client } = state;

  const requestOptions = state.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  if (!state.isStarted) {
    const deletedCertificate = await client.deleteCertificate(certificateName, requestOptions);
    state.isStarted = true;
    state.result = deletedCertificate;
    if (!deletedCertificate.recoveryId) {
      state.isCompleted = true;
    }
  }

  if (!state.isCompleted) {
    try {
      state.result = await client.getDeletedCertificate(certificateName, { requestOptions });
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

  return makeDeleteCertificatePollOperation(state);
}

/**
 * @summary Reaches to the service and cancels the certificate's operation, also updating the certificate's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 * @internal
 */
async function cancel(): Promise<DeleteCertificatePollOperation> {
  throw new Error("Canceling the deletion of a certificate is not supported.");
}

/**
 * @summary Serializes the create certificate's poll operation
 * @internal
 */
function toString(this: DeleteCertificatePollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a create certificate's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 * @internal
 */
export function makeDeleteCertificatePollOperation(
  state: DeleteCertificatePollOperationState
): DeleteCertificatePollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
