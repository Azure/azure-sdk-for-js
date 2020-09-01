// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import {
  RestoreSecretBackupPollOperationState,
  makeRestoreSecretBackupPollOperation,
  TestSecretClientInterface
} from "./operation";
import { SecretProperties } from "../../../../src/secretsModels";

export interface RestoreSecretBackupPollerOptions {
  client: TestSecretClientInterface;
  backup: Uint8Array;
  requestOptions?: RequestOptionsBase;
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
   * @memberof RestoreSecretBackupPoller
   */
  public intervalInMs: number;

  constructor(options: RestoreSecretBackupPollerOptions) {
    const { client, backup, requestOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: RestoreSecretBackupPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeRestoreSecretBackupPollOperation({
      ...state,
      backup,
      requestOptions,
      client
    });

    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof RestoreSecretBackupPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
