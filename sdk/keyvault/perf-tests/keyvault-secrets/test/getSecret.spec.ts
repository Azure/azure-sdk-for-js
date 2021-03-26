import { PerfStressOptionDictionary, PerfStressTest } from "@azure/test-utils-perfstress";
import { credential, keyVaultUri } from "./utils";
import { v4 as uuid } from "uuid";
import { SecretClient } from "@azure/keyvault-secrets";

export abstract class SecretTest<TOptions = Record<string, unknown>> extends PerfStressTest<
  TOptions
> {
  secretClient: SecretClient;
  static secretName = `s-${uuid()}`;

  constructor() {
    super();
    this.secretClient = new SecretClient(keyVaultUri, credential);
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

export class GetSecretTest extends SecretTest {
  public options = {};

  async runAsync(): Promise<void> {
    await this.secretClient.getSecret(SecretTest.secretName);
  }
}

interface ListSecretPerfTestOptions {
  count: number;
}

export class ListSecretsTest extends SecretTest<ListSecretPerfTestOptions> {
  static secretsToDelete: string[] = [];
  options: PerfStressOptionDictionary<ListSecretPerfTestOptions> = {
    count: {
      required: false,
      description: "The number of secrets to create",
      shortName: "c",
      longName: "count",
      defaultValue: 10
    }
  };

  async globalSetup() {
    await super.globalSetup();
    const secretToCreate = Array.from({ length: this.parsedOptions.count.value! }, (_x, i) => {
      const name = `s${i}-${uuid()}`;
      ListSecretsTest.secretsToDelete.push(name);
      return this.secretClient.setSecret(name, "value");
    });

    await Promise.all(secretToCreate);
  }

  async globalCleanup() {
    await super.globalCleanup();

    const startDeletePromises = ListSecretsTest.secretsToDelete.map((name) =>
      this.secretClient.beginDeleteSecret(name)
    );
    await Promise.all(startDeletePromises);
  }

  async runAsync(): Promise<void> {
    let count = 0;
    for await (const _secret of this.secretClient.listPropertiesOfSecrets()) {
      count++;
    }
  }
}
