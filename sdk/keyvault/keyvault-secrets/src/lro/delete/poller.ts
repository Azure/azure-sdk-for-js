// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import { DeleteSecretPollOperationState, makeDeleteSecretPollOperation } from "./operation";
import { DeletedSecret, SecretClientInterface } from "../../secretsModels";

export interface DeleteSecretPollerOptions {
  client: SecretClientInterface;
  name: string;
  requestOptions?: RequestOptionsBase;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that deletes a poller that waits until a secret finishes being deleted
 */
export class DeleteSecretPoller extends Poller<DeleteSecretPollOperationState, DeletedSecret> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof DeleteSecretPoller
   */
  public intervalInMs: number;

  constructor(options: DeleteSecretPollerOptions) {
    const { client, name, requestOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: DeleteSecretPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeDeleteSecretPollOperation({
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
   * @memberof DeleteSecretPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
