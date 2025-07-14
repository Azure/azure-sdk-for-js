// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates using AzurePipelinesCredential
 */
import { AzurePipelinesCredential } from "@azure/identity";
import { KeyClient } from "@azure/keyvault-keys";

async function main() {
  const clientId = process.env.AZURE_SERVICE_CONNECTION_CLIENT_ID!;
  const tenantId = process.env.AZURE_SERVICE_CONNECTION_TENANT_ID!;
  const serviceConnectionId = process.env.AZURE_SERVICE_CONNECTION_ID!;
  const systemAccessToken = process.env.SYSTEM_ACCESSTOKEN;
  if (systemAccessToken) {
    const credential = new AzurePipelinesCredential(
      tenantId,
      clientId,
      serviceConnectionId,
      systemAccessToken,
    );

    const keyVaultUrl = `https://key-vault-name.vault.azure.net`;
    const client = new KeyClient(keyVaultUrl, credential);

    // Retrieving the properties of the existing keys in that specific Key Vault.
    console.log(await client.listPropertiesOfKeys().next());
  }
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
