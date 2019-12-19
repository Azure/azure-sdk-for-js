// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller, PollerLike } from "../core-lro-update";
import {
  CertificateOperationPollPublicState,
  CertificateOperationPollPrivateState,
  makeCertificateOperationPollOperation
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
 * Interface that represents a basic Poller with the specifications defined by CertificateOperationPoller.
 */
export type CertificateOperationPollerLike = PollerLike<
  CertificateOperationPollPublicState,
  KeyVaultCertificateWithPolicy
>;

/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 */
export class CertificateOperationPoller extends Poller<
  CertificateOperationPollPrivateState,
  KeyVaultCertificateWithPolicy
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof CertificateOperationPoller
   */
  public intervalInMs: number;

  constructor(options: CertificateOperationPollerOptions) {
    const { client, certificateName, requestOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: CertificateOperationPollPrivateState | undefined;

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
   * 
   */
  public getState(): CertificateOperationPollPrivateState {
    return {
      certificateName: this.operation.state.certificateName,
      certificateOperation: this.operation.state.certificateOperation
    };
  }
}
