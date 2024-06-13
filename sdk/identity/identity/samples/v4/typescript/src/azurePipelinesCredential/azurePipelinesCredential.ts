// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Authenticates using AzurePipelines Credential
 */
import { AzurePipelinesCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

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
      systemAccessToken
    );
    const client = new SecretClient("https://YOUR_KEYVAULT_NAME.vault.azure.net/", credential);
    await client.getSecret("secretKey");
    // do something with the secret
  }
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
