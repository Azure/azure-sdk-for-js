import { PerfStressTest } from "@azure/test-utils-perfstress";
import { DeviceCodeCredential } from "@azure/identity";

const scope = `https://servicebus.azure.net/.default`;

export abstract class DeviceCodeCredentialTest extends PerfStressTest {
  options = {};
  credential: DeviceCodeCredential;

  constructor() {
    super();
    this.credential = new DeviceCodeCredential({
      tokenCachePersistenceOptions: {
        name: "nodeTestSilent",
        allowUnencryptedStorage: true
      }
    });
  }

  async globalSetup(): Promise<void> {
    await this.credential.authenticate(scope);
  }
}

/**
 * This test does silent authentication with persistence enabled.
 */
export class DeviceCodeCredentialPersistenceTest extends DeviceCodeCredentialTest {
  async runAsync(): Promise<void> {
    await this.credential.getToken(scope);
  }
}
