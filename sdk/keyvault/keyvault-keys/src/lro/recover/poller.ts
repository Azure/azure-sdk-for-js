// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import {
  RecoverDeletedKeyPollOperationState,
  makeRecoverDeletedKeyPollOperation
} from "./operation";
import { Key, KeyClientInterface } from "../../keysModels";

export interface RecoverDeletedKeyPollerOptions {
  client: KeyClientInterface;
  name: string;
  requestOptions?: RequestOptionsBase;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that deletes a poller that waits until a key finishes being deleted
 */
export class RecoverDeletedKeyPoller extends Poller<RecoverDeletedKeyPollOperationState, Key> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof RecoverDeletedKeyPoller
   */
  public intervalInMs: number;

  constructor(options: RecoverDeletedKeyPollerOptions) {
    const { client, name, requestOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: RecoverDeletedKeyPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeRecoverDeletedKeyPollOperation({
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
   * @memberof RecoverDeletedKeyPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }

  /**
   * This method returns the key. It will throw if the key is missing.
   * @memberof RecoverDeletedKeyPoller
   */
  getKey(): Key {
    if (!this.operation.state.result) {
      if (this.operation.state.error) {
        throw this.operation.state.error;
      } else {
        throw new Error("The resource couldn't be retrieved");
      }
    }
    return this.operation.state.result;
  }
}
