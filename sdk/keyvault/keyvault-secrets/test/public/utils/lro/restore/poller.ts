// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, OperationOptions } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import {
  RestoreSecretBackupPollOperationState,
  makeRestoreSecretBackupPollOperation,
  TestSecretClientInterface,
} from "./operation";
import { SecretProperties } from "../../../../../src";

export interface RestoreSecretBackupPollerOptions {
  client: TestSecretClientInterface;
  backup: Uint8Array;
  operationOptions?: OperationOptions;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that creates a poller that waits until a secret finishes being restored
 */
export class RestoreSecretBackupPoller extends Poller<
  RestoreSecretBackupPollOperationState,
  SecretProperties
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number;

  constructor(options: RestoreSecretBackupPollerOptions) {
    const { client, backup, operationOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: RestoreSecretBackupPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeRestoreSecretBackupPollOperation({
      ...state,
      backup,
      operationOptions,
      client,
    });

    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
