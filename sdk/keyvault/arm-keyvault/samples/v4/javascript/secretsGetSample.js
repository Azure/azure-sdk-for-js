// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified secret.  NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets.
 *
 * @summary Gets the specified secret.  NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2025-05-01/examples/getSecret.json
 */
async function getASecret() {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["KEYVAULT_RESOURCE_GROUP"] || "sample-group";
  const vaultName = "sample-vault";
  const secretName = "secret-name";
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.secrets.get(resourceGroupName, vaultName, secretName);
  console.log(result);
}

async function main() {
  await getASecret();
}

main().catch(console.error);
