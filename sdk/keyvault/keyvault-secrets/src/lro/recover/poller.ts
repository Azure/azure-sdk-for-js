// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import {
  RecoverDeletedSecretPollOperationState,
  makeRecoverDeletedSecretPollOperation
} from "./operation";
import { SecretProperties, SecretClientInterface } from "../../secretsModels";

export interface RecoverDeletedSecretPollerOptions {
  client: SecretClientInterface;
  name: string;
  requestOptions?: RequestOptionsBase;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that deletes a poller that waits until a secret finishes being deleted
 */
export class RecoverDeletedSecretPoller extends Poller<
  RecoverDeletedSecretPollOperationState,
  SecretProperties
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof RecoverDeletedSecretPoller
   */
  public intervalInMs: number;

  constructor(options: RecoverDeletedSecretPollerOptions) {
    const { client, name, requestOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: RecoverDeletedSecretPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeRecoverDeletedSecretPollOperation({
      ...state,
      name,
      requestOptions,
      client
    });

    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof RecoverDeletedSecretPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
