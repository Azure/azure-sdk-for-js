import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { SecretTest } from "./secretTest";
import { v4 as uuid } from "uuid";

interface ListSecretPerfTestOptions {
  count: number;
}

export class ListSecretsTest extends SecretTest<ListSecretPerfTestOptions> {
  static secretsToDelete: string[] = [];
  options: PerfOptionDictionary<ListSecretPerfTestOptions> = {
    count: {
      required: false,
      description: "The number of secrets to create",
      shortName: "c",
      longName: "count",
      defaultValue: 10
    }
  };

  async globalSetup() {
    // Validate that vault contains 0 secrets (including soft-deleted secrets), since additional secrets
    // (including soft-deleted) impact performance.
    if (
      !(await this.secretClient.listPropertiesOfSecrets().next()).done ||
      !(await this.secretClient.listDeletedSecrets().next()).done
    ) {
      throw new Error(
        `KeyVault ${this.secretClient.vaultUrl} must contain 0 ` +
          "secrets (including soft-deleted) before starting perf test"
      );
    }

    const secretToCreate = Array.from({ length: this.parsedOptions.count.value! }, (_x, i) => {
      const name = `s${i}-${uuid()}`;
      ListSecretsTest.secretsToDelete.push(name);
      return this.secretClient.setSecret(name, "value");
    });

    await Promise.all(secretToCreate);
  }

  async run(): Promise<void> {
    // eslint-disable-next-line no-empty
    for await (const _secret of this.secretClient.listPropertiesOfSecrets()) {
    }
  }

  async globalCleanup() {
    await this.deleteAndPurgeSecrets(...ListSecretsTest.secretsToDelete);
  }
}
