// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import {
  RecoverDeletedCertificatePollOperationState,
  makeRecoverDeletedCertificatePollOperation
} from "./operation";
import {
  KeyVaultCertificateWithPolicy,
  CertificateClientInterface
} from "../../certificatesModels";

export interface RecoverDeletedCertificatePollerOptions {
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
export class RecoverDeletedCertificatePoller extends Poller<
  RecoverDeletedCertificatePollOperationState,
  KeyVaultCertificateWithPolicy
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof RecoverDeletedCertificatePoller
   */
  public intervalInMs: number;

  constructor(options: RecoverDeletedCertificatePollerOptions) {
    const { client, certificateName, requestOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: RecoverDeletedCertificatePollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeRecoverDeletedCertificatePollOperation({
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
   * @memberof RecoverDeletedCertificatePoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
