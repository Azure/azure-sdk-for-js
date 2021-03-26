import { PerfStressTest } from "@azure/test-utils-perfstress";
import { KeyClient } from "@azure/keyvault-keys";
import { credential, keyVaultUri } from "../utils";
import { v4 as uuid } from "uuid";

export abstract class KeyTest extends PerfStressTest {
  keyClient: KeyClient;
  static keyName = `k-${uuid()}`;

  constructor() {
    super();
    this.keyClient = new KeyClient(keyVaultUri, credential);
  }

  async globalSetup() {
    // Create a single shared key for all tests
    await this.keyClient.createRsaKey(KeyTest.keyName, {
      keySize: 2048
    });
  }

  async globalCleanup() {
    const poller = await this.keyClient.beginDeleteKey(KeyTest.keyName);
    const result = await poller.pollUntilDone();
    if (result.properties.recoveryId) {
      await this.keyClient.purgeDeletedKey(KeyTest.keyName);
    }
  }
}

export class GetKeyTest extends KeyTest {
  public options = {};

  async runAsync(): Promise<void> {
    await this.keyClient.getKey(KeyTest.keyName);
  }
}
