// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller, PollerLike } from "@azure/core-lro";
import {
  CertificateOperationPollOperationState,
  makeCertificateOperationPollOperation,
  CertificateOperationPublicState
} from "./operation";
import { CertificateClientInterface, KeyVaultCertificateWithPolicy } from "../../certificatesModels";

/**
 * An interface representing a poller state with a public property
 */

/**
 * A poller-like interface, similar to @azure/core-lro PollerLike, but with public available state
 * TODO: Move this to @azure/core-lro.
 */
export interface PollerLikeWithPublicState<TPublic, TState, TResult> extends PollerLike<TState, TResult> {
  /**
   * A method to get the public state of this poller.
   */
  getPublicState(): TPublic;
}

export interface CertificateOperationPollerOptions {
  client: CertificateClientInterface;
  certificateName: string;
  requestOptions?: RequestOptionsBase;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
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
      public: {},
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
   * A method to get the public state of this poller.
   * Only works because of PollerLikeWithPublicState.
   */
  getPublicState(): CertificateOperationPublicState {
    return this.operation.state.public;
  }
}
