import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";
import { ClientSecretCredential } from "@azure/identity";

const scope = `https://servicebus.azure.net/.default`;

/**
 * This test does silent authentication with persistence enabled.
 *
 * TODO: This test was made unusable by removing the persistence
 *       feature from the mainline identity package. When we add an
 *       extension package to reintroduce that behavior, this test
 *       will be refactored to support that.
 */
export class ClientSecretCredentialPersistenceTest extends PerfStressTest {
  options = {};
  static credential: ClientSecretCredential;

  async globalSetup(): Promise<void> {
    const tenantId = getEnvVar("AZURE_TENANT_ID");
    const clientId = getEnvVar("AZURE_CLIENT_ID");
    const clientSecret = getEnvVar("AZURE_CLIENT_SECRET");

    // We want this credential to be initialized only if this test is executed.
    // Other tests should not be required to set up this credential.
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret, {
      /* tokenCachePersistenceOptions: {
        name: "nodeTestSilent",
        allowUnencryptedStorage: true
      }*/
    });

    // This getToken call will cache the token.
    await credential.getToken(scope);

    ClientSecretCredentialPersistenceTest.credential = credential;
  }

  async runAsync(): Promise<void> {
    // await ClientSecretCredentialPersistenceTest.credential.getToken(scope);
  }
}
