// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyVaultKey } from "../../../src";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { RestoreKeyBackupPoller } from "../../public/utils/lro/restore/poller";
import { BeginRestoreKeyBackupOptions } from "../../public/utils/lro/restore/operation";
import TestClient from "../../public/utils/testClient";

export default class InternalTestClient extends TestClient {
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
      requestOptions,
    });

    // This will initialize the poller's operation (the recovery of the backup).
    await poller.poll();

    return poller;
  }
}
