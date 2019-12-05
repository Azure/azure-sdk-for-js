// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { RequestOptionsBase } from "@azure/core-http";
import { CertificateClientInterface } from "../../certificatesModels";
import { CertificateOperation } from "../../core/models";

/**
 * An interface representing the state of a create certificate's poll operation
 */
export interface CertificateOperationPollOperationState
  extends PollOperationState<CertificateOperation> {
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
 * An interface representing a create certificate's poll operation
 */
export interface CertificateOperationPollOperation
  extends PollOperation<CertificateOperationPollOperationState, CertificateOperation> {}

/**
 * @summary Reaches to the service and updates the create certificate's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: CertificateOperationPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: CertificateOperationPollOperationState) => void;
  } = {}
): Promise<CertificateOperationPollOperation> {
  const state = this.state;
  const { client, certificateName } = state;

  const requestOptions = state.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  if (!state.isStarted) {
    state.isStarted = true;
  }

  state.result = await client.getPlainCertificateOperation(certificateName, requestOptions);

  if (state.result && state.result.status !== "inProgress") {
    state.isCompleted = true;
    if (state.result.error) {
      state.error = new Error(state.result.error.message);
    }
  }

  return makeCertificateOperationPollOperation(state);
}

/**
 * @summary Reaches to the service and cancels the certificate's operation, also updating the certificate's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(
  this: CertificateOperationPollOperation,
  options: { abortSignal?: AbortSignal } = {}
): Promise<CertificateOperationPollOperation> {
  const state = this.state;
  const { client, certificateName } = state;

  const requestOptions = state.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  state.result = await client.cancelCertificateOperation(certificateName, requestOptions);

  return makeCertificateOperationPollOperation({
    ...this.state,
    isCancelled: true
  });
}

/**
 * @summary Serializes the create certificate's poll operation
 */
function toString(this: CertificateOperationPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a create certificate's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeCertificateOperationPollOperation(
  state: CertificateOperationPollOperationState
): CertificateOperationPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
