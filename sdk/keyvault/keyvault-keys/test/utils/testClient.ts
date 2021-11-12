// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyClient, KeyVaultKey } from "../../src";
import { PollOperationState, PollerLike } from "@azure/core-lro";
import { BeginRestoreKeyBackupOptions } from "./lro/restore/operation";
import { RestoreKeyBackupPoller } from "./lro/restore/poller";
import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { testPollerProperties } from "./recorderUtils";

export default class TestClient {
  public readonly client: KeyClient;
  constructor(client: KeyClient) {
    this.client = client;
  }
  public formatName(name: string): string {
    return name.replace(/[^0-9a-zA-Z-]/g, "");
  }
  public async purgeKey(keyName: string): Promise<void> {
    await this.client.purgeDeletedKey(keyName);
  }
  public async flushKey(keyName: string): Promise<void> {
    const that = this;
    const poller = await that.client.beginDeleteKey(keyName, testPollerProperties);
    await poller.pollUntilDone();
    await this.purgeKey(keyName);
  }
  public async beginRestoreKeyBackup(
    backup: Uint8Array,
    options: BeginRestoreKeyBackupOptions = {}
  ): Promise<PollerLike<PollOperationState<KeyVaultKey>, KeyVaultKey>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const poller = new RestoreKeyBackupPoller({
      backup,
      client: this.client,
      intervalInMs: options.intervalInMs,
      resumeFrom: options.resumeFrom,
      requestOptions
    });

    // This will initialize the poller's operation (the recovery of the backup).
    await poller.poll();

    return poller;
  }
}
