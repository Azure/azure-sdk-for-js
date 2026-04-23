// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the deleted Azure key vault.
 *
 * @summary gets the deleted Azure key vault.
 * x-ms-original-file: 2026-02-01/getDeletedVault.json
 */
async function retrieveADeletedVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.getDeleted("sample-vault", "westus");
  console.log(result);
}

async function main() {
  await retrieveADeletedVault();
}

main().catch(console.error);
