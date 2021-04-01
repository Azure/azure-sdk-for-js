import { PerfStressTest } from "@azure/test-utils-perfstress";
import { ClientSecretCredential } from "@azure/identity";

const scope = `https://servicebus.azure.net/.default`;

/**
 * This test does silent authentication with persistence enabled.
 */
export class ClientSecretCredentialPersistenceTest extends PerfStressTest {
  options = {};
  credential: ClientSecretCredential;

  constructor() {
    super();
    const tenantId = process.env.AZURE_TENANT_ID!;
    const clientId = process.env.AZURE_CLIENT_ID!;
    const clientSecret = process.env.AZURE_CLIENT_SECRET!;

    this.credential = new ClientSecretCredential(tenantId, clientId, clientSecret, {
      tokenCachePersistenceOptions: {
        name: "nodeTestSilent",
        allowUnencryptedStorage: true
      }
    });
  }

  async globalSetup(): Promise<void> {
    await this.credential.getToken(scope);
  }

  async runAsync(): Promise<void> {
    await this.credential.getToken(scope);
  }
}
