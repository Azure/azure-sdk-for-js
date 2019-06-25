import { retry } from "./recorder";
import { RetryOptions } from "./retry";
import { KeysClient } from "../../src";

export default class TestClient {
  public readonly client: KeysClient;
  constructor(client: KeysClient) {
    this.client = client;
  }
  public formatName(name: string) {
    return name.replace(/[^0-9a-zA-Z-]/g, "");
  }
  public async purgeKey(keyName: string): Promise<void> {
    const that = this;
    await retry(async () => that.client.purgeDeletedKey(keyName), {
      isExpectedError: (e) => ["Key is currently being deleted"].includes(e.message)
    } as RetryOptions);
  }
  public async flushKey(keyName: string): Promise<void> {
    const that = this;
    await that.client.deleteKey(keyName);
    await this.purgeKey(keyName);
  }
}
