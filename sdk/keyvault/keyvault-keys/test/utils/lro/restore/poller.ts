// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import {
  RestoreKeyBackupPollOperationState,
  makeRestoreKeyBackupPollOperation,
  TestKeyClientInterface
} from "./operation";
import { KeyVaultKey } from "../../../../src/keysModels";

export interface RestoreKeyBackupPollerOptions {
  client: TestKeyClientInterface;
  backup: Uint8Array;
  requestOptions?: RequestOptionsBase;
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
   * @memberof RestoreKeyBackupPoller
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
      client
    });

    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof RestoreKeyBackupPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
