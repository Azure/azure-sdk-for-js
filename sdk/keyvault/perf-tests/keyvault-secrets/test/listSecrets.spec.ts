import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { SecretTest } from "./secretTest";
import { v4 as uuid } from "uuid";

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
    // eslint-disable-next-line no-empty
    for await (const _secret of this.secretClient.listPropertiesOfSecrets()) {
    }
  }
}
