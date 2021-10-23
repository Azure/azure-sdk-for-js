import { PerfOptionDictionary, PerfTest } from "@azure/test-utils-perf";
import { KeyClient } from "@azure/keyvault-keys";
import { credential, keyVaultUri } from "../utils";
import { v4 as uuid } from "uuid";

interface KeyPerfTestOptions {
  keySize: number;
}

export abstract class KeyTest extends PerfTest<KeyPerfTestOptions> {
  options: PerfOptionDictionary<KeyPerfTestOptions> = {
    keySize: {
      required: false,
      description: "The size of the key to be created",
      shortName: "ks",
      longName: "key-size",
      defaultValue: 2048
    }
  };

  keyClient: KeyClient;
  static keyName = `k-${uuid()}`;

  constructor() {
    super();
    this.keyClient = new KeyClient(keyVaultUri, credential);
  }

  async globalSetup() {
    // Create a single shared key for all tests
    await this.keyClient.createRsaKey(KeyTest.keyName, {
      keySize: this.parsedOptions.keySize.value!
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
  async run(): Promise<void> {
    await this.keyClient.getKey(KeyTest.keyName);
  }
}
