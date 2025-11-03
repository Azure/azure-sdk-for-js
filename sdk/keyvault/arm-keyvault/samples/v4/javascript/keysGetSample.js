// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the current version of the specified key from the specified key vault.
 *
 * @summary gets the current version of the specified key from the specified key vault.
 * x-ms-original-file: 2025-05-01/getKey.json
 */
async function getAKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.keys.get("sample-group", "sample-vault-name", "sample-key-name");
  console.log(result);
}

async function main() {
  await getAKey();
}

main().catch(console.error);
