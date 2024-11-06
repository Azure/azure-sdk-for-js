// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates using AzurePipelinesCredential
 */
const { AzurePipelinesCredential } = require("@azure/identity");
const { KeyClient } = require("@azure/keyvault-keys");

async function main() {
  const clientId = "YOUR_CLIENT_ID";
  const tenantId = "YOUR_TENANT_ID";
  const serviceConnectionId = "YOUR_SERVICE_CONNECTION_ID";
  const systemAccessToken = process.env.SYSTEM_ACCESSTOKEN;
  if (systemAccessToken) {
    const credential = new AzurePipelinesCredential(
      tenantId,
      clientId,
      serviceConnectionId,
      systemAccessToken,
    );
    const client = new KeyClient("https://YOUR_KEYVAULT_NAME.vault.azure.net/", credential);
    await client.getKey("keyValue");
    // do something with the key
  }
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
