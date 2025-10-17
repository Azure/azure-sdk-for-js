// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a secret in the specified subscription.  NOTE: This API is intended for internal use in ARM deployments.  Users should use the data-plane REST service for interaction with vault secrets.
 *
 * @summary update a secret in the specified subscription.  NOTE: This API is intended for internal use in ARM deployments.  Users should use the data-plane REST service for interaction with vault secrets.
 * x-ms-original-file: 2025-05-01/updateSecret.json
 */
async function updateASecret() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.secrets.update("sample-group", "sample-vault", "secret-name", {
    properties: { value: "secret-value2" },
  });
  console.log(result);
}

async function main() {
  await updateASecret();
}

main().catch(console.error);
