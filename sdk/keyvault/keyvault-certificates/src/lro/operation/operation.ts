// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike, AbortSignal } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { RequestOptionsBase } from "@azure/core-http";
import {
  CertificateOperation,
  CertificateClientInterface,
  KeyVaultCertificateWithPolicy
} from "../../certificatesModels";

/**
 * An interface representing the publicly available properties of the state of the CertificateOperationPoller.
 */
export interface CertificateOperationState
  extends PollOperationState<KeyVaultCertificateWithPolicy> {
  /**
   * The name of the certificate.
   */
  certificateName: string;
  /**
   * The operation of the certificate
   */
  certificateOperation?: CertificateOperation;
}

/**
 * An interface representing the state of a create certificate's poll operation
 * @internal
 */
export interface CertificateOperationPollOperationState
  extends PollOperationState<KeyVaultCertificateWithPolicy> {
  /**
   * The name of the certificate.
   */
  certificateName: string;
  /**
   * The operation of the certificate
   */
  certificateOperation?: CertificateOperation;
  /**
   * Options for the core-http requests.
   */
  requestOptions?: RequestOptionsBase;
  /**
   * An interface representing a CertificateClient. For internal use.
   */
  client?: CertificateClientInterface;
}

/**
 * An interface representing a create certificate's poll operation
 * @internal
 */
export type CertificateOperationPollOperation = PollOperation<
  CertificateOperationPollOperationState,
  KeyVaultCertificateWithPolicy
>;

/**
 * @summary Reaches to the service and updates the create certificate's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 * @internal
 */
async function update(
  this: CertificateOperationPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: CertificateOperationPollOperationState) => void;
  } = {}
): Promise<CertificateOperationPollOperation> {
  const state = this.state;
  const client = state.client!;
  const certificateName = state.certificateName!;

  const requestOptions = state.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  if (!state.isStarted) {
    state.isStarted = true;
    state.result = await client.getCertificate(certificateName, requestOptions);
    state.certificateOperation = await client.getPlainCertificateOperation(
      certificateName,
      requestOptions
    );
  } else if (!state.isCompleted) {
    state.certificateOperation = await client.getPlainCertificateOperation(
      certificateName,
      requestOptions
    );
  }

  if (state.certificateOperation && state.certificateOperation.status !== "inProgress") {
    state.isCompleted = true;
    state.result = await client.getCertificate(certificateName, requestOptions);
    if (state.certificateOperation.error) {
      state.error = new Error(state.certificateOperation.error.message);
    }
  }

  return makeCertificateOperationPollOperation(state);
}

/**
 * @summary Reaches to the service and cancels the certificate's operation, also updating the certificate's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 * @internal
 */
async function cancel(
  this: CertificateOperationPollOperation,
  options: { abortSignal?: AbortSignal } = {}
): Promise<CertificateOperationPollOperation> {
  const state = this.state;
  const client = state.client!;
  const certificateName = state.certificateName!;

  const requestOptions = state.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  state.certificateOperation = await client.cancelCertificateOperation(
    certificateName,
    requestOptions
  );

  return makeCertificateOperationPollOperation({
    ...this.state,
    isCancelled: true
  });
}

/**
 * @summary Serializes the create certificate's poll operation
 * @internal
 */
function toString(this: CertificateOperationPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a create certificate's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 * @internal
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
