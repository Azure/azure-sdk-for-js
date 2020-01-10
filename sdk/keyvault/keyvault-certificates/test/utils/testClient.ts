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
}
