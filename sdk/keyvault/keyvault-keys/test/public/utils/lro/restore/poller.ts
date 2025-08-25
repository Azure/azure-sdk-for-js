// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import { delay } from "@azure/core-util";
import { Poller } from "@azure/core-lro";
import type { RestoreKeyBackupPollOperationState, TestKeyClientInterface } from "./operation.js";
import { makeRestoreKeyBackupPollOperation } from "./operation.js";
import type { KeyVaultKey } from "@azure/keyvault-keys";

export interface RestoreKeyBackupPollerOptions {
  client: TestKeyClientInterface;
  backup: Uint8Array;
  requestOptions?: OperationOptions;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that creates a poller that waits until a key finishes being restored
 */
export class RestoreKeyBackupPoller extends Poller<
  RestoreKeyBackupPollOperationState,
  KeyVaultKey
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number;

  constructor(options: RestoreKeyBackupPollerOptions) {
    const { client, backup, requestOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: RestoreKeyBackupPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeRestoreKeyBackupPollOperation({
      ...state,
      backup,
      requestOptions,
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
