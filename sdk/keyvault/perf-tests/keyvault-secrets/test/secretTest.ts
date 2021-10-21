import { SecretClient } from "@azure/keyvault-secrets";
import { PerfTest } from "@azure/test-utils-perf";
import { keyVaultUri, credential } from "./utils";

export abstract class SecretTest<TOptions = Record<string, unknown>> extends PerfTest<TOptions> {
  secretClient: SecretClient;

  constructor() {
    super();
    this.secretClient = new SecretClient(
      keyVaultUri,
      credential,
      this.configureClientOptionsCoreV1({})
    );
  }

  async deleteAndPurgeSecrets(...names: string[]) {
    await Promise.all(
      names.map(async (name) => {
        const poller = await this.secretClient.beginDeleteSecret(name);
        const deletedSecret = await poller.pollUntilDone();
        if (deletedSecret.recoveryId) {
          await this.secretClient.purgeDeletedSecret(name);
        }
      })
    );
  }
}
