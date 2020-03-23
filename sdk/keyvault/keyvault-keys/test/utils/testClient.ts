import { retry, testPollerProperties } from "./recorderUtils";
import { KeyClient } from "@azure/keyvault-keys";

export default class TestClient {
  public readonly client: KeyClient;
  constructor(client: KeyClient) {
    this.client = client;
  }
  public formatName(name: string): string {
    return name.replace(/[^0-9a-zA-Z-]/g, "");
  }
  public async purgeKey(keyName: string): Promise<void> {
    const that = this;
    await retry(async () => {
      try {
        await that.client.purgeDeletedKey(keyName);
      } catch (e) {
        if (["Key is currently being deleted."].includes(e.message)) throw e;
        else return;
      }
    });
  }
  public async flushKey(keyName: string): Promise<void> {
    const that = this;
    const poller = await that.client.beginDeleteKey(keyName, testPollerProperties);
    await poller.pollUntilDone();
    await this.purgeKey(keyName);
  }
}
