// ------------------------------------
// Copyright(c) Microsoft Corporation.
// Licensed under the MIT License.
// ------------------------------------
import { DefaultAzureCredential, AzureAuthorityHosts } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

const uuidv1 = require("uuid/v1");

class KeyVaultSecrets {
  private static client: SecretClient;
  private static secretName: string;
  private static secretValue: string;

  private static authorityHostMap: { [alias: string]: string } = {
    AzureCloud: AzureAuthorityHosts.AzurePublicCloud,
    AzureChinaCloud: AzureAuthorityHosts.AzureChina,
    AzureGermanCloud: AzureAuthorityHosts.AzureGermany,
    AzureUSGovernment: AzureAuthorityHosts.AzureGovernment,
  };

  static async Run() {
    console.log(KeyVaultSecrets.dedent`
        ------------------------
        Key Vault - Secrets
        Identity - Credential
        ------------------------
        1) Set a secret
        2) Get that secret
        3) Delete that secret (Clean up the resource)
        `);

    const authorityHost = KeyVaultSecrets.getAuthorityHost(
      process.env["AZURE_CLOUD"] || "",
      AzureAuthorityHosts.AzurePublicCloud
    );

    // DefaultAzureCredential expects the following three environment variables:
    // * AZURE_TENANT_ID: The tenant ID in Azure Active Directory
    // * AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
    // * AZURE_CLIENT_SECRET: The client secret for the registered application
    const credential = new DefaultAzureCredential({
      authorityHost: authorityHost,
    });
    const url = process.env["AZURE_PROJECT_URL"] || "<YourProjectURL>";

    KeyVaultSecrets.client = new SecretClient(url, credential);

    KeyVaultSecrets.secretName = `MySecretName-${uuidv1()}`;
    KeyVaultSecrets.secretValue = "MySecretValue";

    try {
      await KeyVaultSecrets.setSecret();
      await KeyVaultSecrets.getSecret();
    } catch (err) {
      throw err;
    } finally {
      await KeyVaultSecrets.deleteSecret();
    }
  }

  private static async setSecret() {
    console.log("Setting a secret...");
    const result = await KeyVaultSecrets.client.setSecret(
      KeyVaultSecrets.secretName,
      KeyVaultSecrets.secretValue
    );
    console.log(`\tSecret = (${result.name},${result.value})`);
    console.log("\tdone");
  }

  private static async getSecret() {
    console.log("Getting that secret...");
    const result = await KeyVaultSecrets.client.getSecret(
      KeyVaultSecrets.secretName
    );

    if (
      result.name !== KeyVaultSecrets.secretName ||
      result.value !== KeyVaultSecrets.secretValue
    ) {
      throw "Error, a secret was obtained but is not the one that was setted before";
    }

    console.log("\tdone");
  }

  private static async deleteSecret() {
    console.log("Deleting that secret...");
    const poller = await KeyVaultSecrets.client.beginDeleteSecret(
      KeyVaultSecrets.secretName
    );
    await poller.pollUntilDone();
    console.log("\tdone");
  }

  private static dedent(str: ReadonlyArray<string>) {
    return str[0].replace(/^\ */gm, "");
  }

  private static getAuthorityHost(
    authorityHostAlias: string,
    defaultAuthorityHost: string
  ) {
    if (authorityHostAlias in this.authorityHostMap) {
      return this.authorityHostMap[authorityHostAlias];
    }
    return defaultAuthorityHost;
  }
}

// Simulation of exports that will be written into samples via future
// preparation methods
export const RequiredEnvironmentVariables = [
  "AZURE_TENANT_ID",
  "AZURE_CLIENT_ID",
  "AZURE_CLIENT_SECRET",
  "AZURE_PROJECT_URL",
];

export function main() {
  KeyVaultSecrets.Run();
}
