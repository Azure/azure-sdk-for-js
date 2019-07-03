import { retry } from "./recorder";
import { SecretsClient } from "../../src";

export default class TestClient {
  public readonly client: SecretsClient;
  constructor(client: SecretsClient) {
    this.client = client;
  }
  public formatName(name: string) {
    return name.replace(/[^0-9a-zA-Z-]/g, "");
  }
  public async purgeSecret(secretName: string): Promise<void> {
    const that = this;
    await retry(async () => {
      try {
        await that.client.purgeDeletedSecret(secretName);
      } catch (e) {
        if (["Secret is currently being deleted."].includes(e.message)) throw e;
        else return;
      }
    });
  }
  public async flushSecret(secretName: string): Promise<void> {
    const that = this;
    await that.client.deleteSecret(secretName);
    await this.purgeSecret(secretName);
  }
}
