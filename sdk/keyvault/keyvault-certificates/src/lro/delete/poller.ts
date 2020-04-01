// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import {
  DeleteCertificatePollOperationState,
  makeDeleteCertificatePollOperation
} from "./operation";
import { DeletedCertificate, CertificateClientInterface } from "../../certificatesModels";

export interface DeleteCertificatePollerOptions {
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
export class DeleteCertificatePoller extends Poller<
  DeleteCertificatePollOperationState,
  DeletedCertificate
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof DeleteCertificatePoller
   */
  public intervalInMs: number;

  constructor(options: DeleteCertificatePollerOptions) {
    const { client, certificateName, requestOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: DeleteCertificatePollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeDeleteCertificatePollOperation({
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
   * @memberof DeleteCertificatePoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
