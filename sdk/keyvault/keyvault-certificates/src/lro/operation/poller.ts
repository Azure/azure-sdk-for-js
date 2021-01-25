// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import {
  CertificateOperationPollOperationState,
  makeCertificateOperationPollOperation,
  CertificateOperationState
} from "./operation";
import {
  CertificateOperation,
  CertificateClientInterface,
  KeyVaultCertificateWithPolicy
} from "../../certificatesModels";

export interface CertificateOperationPollerOptions {
  client: CertificateClientInterface;
  certificateName: string;
  requestOptions?: RequestOptionsBase;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 * @internal
 */
export class CertificateOperationPoller extends Poller<
  CertificateOperationPollOperationState,
  KeyVaultCertificateWithPolicy
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof CertificateOperationPoller
   */
  public intervalInMs: number;

  constructor(options: CertificateOperationPollerOptions) {
    const { client, certificateName, requestOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: CertificateOperationPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeCertificateOperationPollOperation({
      ...state,
      certificateName,
      requestOptions,
      client
    });

    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof CertificateOperationPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }

  /**
   * Method to get the certificate operation
   */
  public getCertificateOperation(): CertificateOperation {
    return this.operation.state.certificateOperation!;
  }

  /**
   * Gets the state of the polling operation
   */
  public getOperationState(): CertificateOperationState {
    const state: CertificateOperationState = this.operation.state;
    return {
      isStarted: state.isStarted,
      isCompleted: state.isCompleted,
      isCancelled: state.isCancelled,
      error: state.error,
      result: state.result,
      certificateName: state.certificateName,
      certificateOperation: state.certificateOperation
    };
  }
}
