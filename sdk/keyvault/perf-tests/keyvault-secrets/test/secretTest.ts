import { SecretClient } from "@azure/keyvault-secrets";
import { PerfStressTest } from "@azure/test-utils-perfstress";
import { keyVaultUri, credential } from "./utils";
import { v4 as uuid } from "uuid";

export abstract class SecretTest<TOptions = Record<string, unknown>> extends PerfStressTest<
  TOptions
> {
  secretClient: SecretClient;
  static secretName = `s-${uuid()}`;

  constructor() {
    super();
    this.secretClient = new SecretClient(
      keyVaultUri,
      credential,
      this.configureClientOptionsCoreV1({})
    );
  }

  async globalSetup() {
    await this.secretClient.setSecret(SecretTest.secretName, "value");
  }

  async globalCleanup() {
    const poller = await this.secretClient.beginDeleteSecret(SecretTest.secretName);
    const deletedSecret = await poller.pollUntilDone();
    if (deletedSecret.recoveryId) {
      await this.secretClient.purgeDeletedSecret(SecretTest.secretName);
    }
  }
}
