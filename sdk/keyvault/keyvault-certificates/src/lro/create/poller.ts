// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import {
  makeCreateCertificatePollOperation,
  CreateCertificatePollOperationState
} from "./operation";
import {
  KeyVaultCertificateWithPolicy,
  CreateCertificateOptions,
  CertificateClientInterface,
  CertificatePolicy
} from "../../certificatesModels";

export interface CreateCertificatePollerOptions {
  client: CertificateClientInterface;
  certificateName: string;
  certificatePolicy?: CertificatePolicy;
  createCertificateOptions: CreateCertificateOptions;
  requestOptions?: RequestOptionsBase;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 * @internal
 */
export class CreateCertificatePoller extends Poller<
  CreateCertificatePollOperationState,
  KeyVaultCertificateWithPolicy
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof CreateCertificatePoller
   */
  public intervalInMs: number;

  constructor(options: CreateCertificatePollerOptions) {
    const {
      client,
      certificateName,
      certificatePolicy,
      createCertificateOptions,
      requestOptions,
      intervalInMs = 2000,
      resumeFrom
    } = options;

    let state: CreateCertificatePollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeCreateCertificatePollOperation({
      ...state,
      certificateName,
      certificatePolicy,
      createCertificateOptions,
      requestOptions,
      client
    });

    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof CreateCertificatePoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
