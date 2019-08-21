import { retry } from "./recorder";
import { CertificatesClient } from "../../src";

export default class TestClient {
  public readonly client: CertificatesClient;
  constructor(client: CertificatesClient) {
    this.client = client;
  }
  public formatName(name: string): string {
    return name.replace(/[^0-9a-zA-Z-]/g, "");
  }
  public async purgeCertificate(keyName: string): Promise<void> {
    const that = this;
    await retry(async () => {
      try {
        await that.client.purgeDeletedCertificate(keyName);
      } catch (e) {
        if (["Certificate is currently being deleted."].includes(e.message)) throw e;
        else return;
      }
    });
  }
  public async flushCertificate(keyName: string): Promise<void> {
    const that = this;
    await that.client.deleteCertificate(keyName);
    await this.purgeCertificate(keyName);
  }
}
