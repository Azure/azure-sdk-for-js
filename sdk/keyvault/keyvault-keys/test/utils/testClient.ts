import { testPollerProperties } from "./recorderUtils";
import { KeyClient } from "../../src";

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
}
