import { retry } from "./recorder";
import { RetryOptions } from "./retry";
import { SecretsClient } from "../../src";

export default class TestClient {
  public readonly client: SecretsClient;
  constructor(client: SecretsClient) {
    this.client = client;
  }
  public formatName(name: string) {
    return name.replace(/[^0-9a-zA-Z-]/g, "");
  }
  public async purgeSecret(keyName: string): Promise<void> {
    const that = this;
    await retry(async () => that.client.purgeDeletedSecret(keyName), {
      isExpectedError: (e) => ["Secret is currently being deleted"].includes(e.message)
    } as RetryOptions);
  }
  public async flushSecret(keyName: string): Promise<void> {
    const that = this;
    await that.client.deleteSecret(keyName);
    await this.purgeSecret(keyName);
  }
}
