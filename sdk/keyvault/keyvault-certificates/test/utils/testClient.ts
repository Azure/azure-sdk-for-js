// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CertificateClient, KeyVaultCertificate } from "../../src";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { RestoreCertificateBackupPoller } from "./lro/restore/poller";
import { BeginRestoreCertificateBackupOptions } from "./lro/restore/operation";

export default class TestClient {
  public readonly client: CertificateClient;
  constructor(client: CertificateClient) {
    this.client = client;
  }
  public formatName(name: string): string {
    return name.replace(/[^0-9a-zA-Z-]/g, "");
  }
  public async purgeCertificate(certificateName: string): Promise<void> {
    await this.client.purgeDeletedCertificate(certificateName);
  }
  public async flushCertificate(certificateName: string): Promise<void> {
    const that = this;
    const poller = await that.client.beginDeleteCertificate(certificateName);
    await poller.pollUntilDone();
    await this.purgeCertificate(certificateName);
  }
  public async beginRestoreCertificateBackup(
    backup: Uint8Array,
    options: BeginRestoreCertificateBackupOptions = {}
  ): Promise<PollerLike<PollOperationState<KeyVaultCertificate>, KeyVaultCertificate>> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const poller = new RestoreCertificateBackupPoller({
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
