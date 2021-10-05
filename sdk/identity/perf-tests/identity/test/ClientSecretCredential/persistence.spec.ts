import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";
import { useIdentityPlugin, ClientSecretCredential } from "@azure/identity";

import { cachePersistencePlugin } from "@azure/identity-cache-persistence";
useIdentityPlugin(cachePersistencePlugin);

const scope = `https://servicebus.azure.net/.default`;

/**
 * This test does silent authentication with persistence enabled.
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
      tokenCachePersistenceOptions: {
        enabled: true,
        name: "nodeTestSilent",
        unsafeAllowUnencryptedStorage: true
      }
    });

    // This getToken call will cache the token.
    await credential.getToken(scope);

    ClientSecretCredentialPersistenceTest.credential = credential;
  }

  async runAsync(): Promise<void> {
    await ClientSecretCredentialPersistenceTest.credential.getToken(scope);
  }
}
