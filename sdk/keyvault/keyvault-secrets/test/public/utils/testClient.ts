// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { testPollerProperties } from "./recorderUtils.js";
import type { SecretClient, SecretProperties } from "../../../src/index.js";
import type { PollOperationState, PollerLike } from "@azure/core-lro";
import { RestoreSecretBackupPoller } from "./lro/restore/poller.js";
import type { BeginRestoreSecretBackupOptions } from "./lro/restore/operation.js";

export default class TestClient {
  public readonly client: SecretClient;
  constructor(client: SecretClient) {
    this.client = client;
  }
  public formatName(name: string): string {
    return name.replace(/[^0-9a-zA-Z-]/g, "");
  }
  public async purgeSecret(secretName: string): Promise<void> {
    await this.client.purgeDeletedSecret(secretName);
  }
  public async flushSecret(secretName: string): Promise<void> {
    const that = this;
    const deletePoller = await that.client.beginDeleteSecret(secretName, testPollerProperties);
    await deletePoller.pollUntilDone();
    await this.purgeSecret(secretName);
  }
  public async beginRestoreSecretBackup(
    backup: Uint8Array,
    options: BeginRestoreSecretBackupOptions = {},
  ): Promise<PollerLike<PollOperationState<SecretProperties>, SecretProperties>> {
    const poller = new RestoreSecretBackupPoller({
      backup,
      client: this.client,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      operationOptions: options,
    });

    // This will initialize the poller's operation (the recovery of the backup).
    await poller.poll();

    return poller;
  }
}
