import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { RestError } from "@azure/core-http";
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

    if (!(await this.secretClient.listPropertiesOfSecrets().next()).done ||
      !(await this.secretClient.listDeletedSecrets().next()).done) {

      throw new Error(`KeyVault ${this.secretClient.vaultUrl} must contain 0 ` +
        "secrets (including soft-deleted) before starting perf test");
    }

    const secretToCreate = Array.from({ length: this.parsedOptions.count.value! }, (_x, i) => {
      const name = `s${i}-${uuid()}`;
      ListSecretsTest.secretsToDelete.push(name);
      return this.secretClient.setSecret(name, "value");
    });

    await Promise.all(secretToCreate);
  }

  async globalCleanup() {
    await super.globalCleanup();

    const startDeletePromises = ListSecretsTest.secretsToDelete.map(async (name) => {
      try {
        await (await this.secretClient.beginDeleteSecret(name)).pollUntilDone();

        try {
          await this.secretClient.purgeDeletedSecret(name);
        }
        catch (error) {
          if (error instanceof RestError && (error as RestError).code == "SecretNotFound") {
            console.log(`Unable to purge secret '${name}': ${(error as RestError).code}`);
          }
          else {
            throw error;
          }
        }
      }
      catch (error) {
        if (error instanceof RestError && (error as RestError).code == "SecretNotFound") {
          console.log(`Unable to delete secret '${name}': ${(error as RestError).code}`);
        }
        else {
          throw error;
        }
      }
    });
    await Promise.all(startDeletePromises);
  }

  async runAsync(): Promise<void> {
    // eslint-disable-next-line no-empty
    for await (const _secret of this.secretClient.listPropertiesOfSecrets()) {
    }
  }
}
