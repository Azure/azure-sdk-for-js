// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfTest } from "@azure-tools/test-perf";
import { credential, keyVaultUri } from "./utils.js";
import { CertificateClient, WellKnownIssuer } from "@azure/keyvault-certificates";
import { randomUUID } from "node:crypto";

export abstract class CertificateTest extends PerfTest {
  options = {};
  certificateClient: CertificateClient;
  static certificateName = `c-${randomUUID()}`;

  constructor() {
    super();
    this.certificateClient = new CertificateClient(keyVaultUri, credential);
  }

  async globalSetup() {
    const poller = await this.certificateClient.beginCreateCertificate(
      CertificateTest.certificateName,
      { issuerName: WellKnownIssuer.Self, subject: "CN=Azure SDK" },
    );
    await poller.pollUntilDone();
  }

  async globalCleanup() {
    const poller = await this.certificateClient.beginDeleteCertificate(
      CertificateTest.certificateName,
    );
    const result = await poller.pollUntilDone();
    if (result.recoveryId) {
      await this.certificateClient.purgeDeletedCertificate(CertificateTest.certificateName);
    }
  }
}

export class GetCertificateTest extends CertificateTest {
  public options = {};

  async run(): Promise<void> {
    await this.certificateClient.getCertificate(CertificateTest.certificateName);
  }
}
