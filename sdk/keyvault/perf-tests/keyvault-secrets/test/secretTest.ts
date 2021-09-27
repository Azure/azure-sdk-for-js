import { SecretClient } from "@azure/keyvault-secrets";
import { PerfStressTest } from "@azure/test-utils-perfstress";
import { keyVaultUri, credential } from "./utils";

export abstract class SecretTest<TOptions = Record<string, unknown>> extends PerfStressTest<
  TOptions
> {
  secretClient: SecretClient;

  constructor() {
    super();
    // TODO: Remove when "--insecure" option is added to perf framework
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    this.secretClient = new SecretClient(keyVaultUri, credential);
  }

  async deleteAndPurgeSecrets(...names: string[]) {
    await Promise.all(names.map(async (name) => {
      const poller = await this.secretClient.beginDeleteSecret(name);
      const deletedSecret = await poller.pollUntilDone();
      if (deletedSecret.recoveryId) {
        await this.secretClient.purgeDeletedSecret(name);
      }
    }));
  }
}
