import { PerfStressTest } from "@azure/test-utils-perfstress";
import { DeviceCodeCredential, AuthenticationRecord } from "@azure/identity";

const scope = `https://servicebus.azure.net/.default`;

export abstract class DeviceCodeCredentialTest extends PerfStressTest {
  options = {};
  credential: DeviceCodeCredential;
  account: AuthenticationRecord;

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
    this.account = await this.credential.authenticate(scope);
  }
}

export class DeviceCodeCredentialPersistenceTest extends DeviceCodeCredentialTest {
  async runAsync(): Promise<void> {
    await this.credential.getToken(scope);
  }
}
