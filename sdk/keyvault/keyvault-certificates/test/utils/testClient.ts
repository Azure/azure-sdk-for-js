// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { retry } from "./recorderUtils";
import { CertificateClient } from "../../src";

export default class TestClient {
  public readonly client: CertificateClient;
  constructor(client: CertificateClient) {
    this.client = client;
  }
  public formatName(name: string): string {
    return name.replace(/[^0-9a-zA-Z-]/g, "");
  }
  // Disabling a couple of eslint rules, since this code is not part of the API surface.
  /* eslint-disable @azure/azure-sdk/ts-apisurface-supportcancellation, @typescript-eslint/no-this-alias */
  public async purgeCertificate(certificateName: string): Promise<void> {
    const that = this;
    await retry(async () => {
      try {
        await that.client.purgeDeletedCertificate(certificateName);
      } catch (e) {
        if (["Certificate is currently being deleted."].includes(e.message)) throw e;
        else return;
      }
    });
  }
  public async flushCertificate(certificateName: string): Promise<void> {
    const that = this;
    const poller = await that.client.beginDeleteCertificate(certificateName);
    await poller.pollUntilDone();
    await this.purgeCertificate(certificateName);
  }
  /* eslint-enable @azure/azure-sdk/ts-apisurface-supportcancellation, @typescript-eslint/no-this-alias */  
}
