// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import { DeleteKeyPollOperationState, makeDeleteKeyPollOperation } from "./operation";
import { DeletedKey, KeyClientInterface } from "../../keysModels";

export interface DeleteKeyPollerOptions {
  client: KeyClientInterface;
  name: string;
  requestOptions?: RequestOptionsBase;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that deletes a poller that waits until a key finishes being deleted
 */
export class DeleteKeyPoller extends Poller<DeleteKeyPollOperationState, DeletedKey> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof DeleteKeyPoller
   */
  public intervalInMs: number;

  constructor(options: DeleteKeyPollerOptions) {
    const { client, name, requestOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: DeleteKeyPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeDeleteKeyPollOperation({
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
   * @memberof DeleteKeyPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
