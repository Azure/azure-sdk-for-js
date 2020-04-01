import { CertificateClient } from "../../src";

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
}
