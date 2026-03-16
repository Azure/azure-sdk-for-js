// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to permanently deletes the specified vault. aka Purges the deleted Azure key vault.
 *
 * @summary permanently deletes the specified vault. aka Purges the deleted Azure key vault.
 * x-ms-original-file: 2026-02-01/purgeDeletedVault.json
 */
async function purgeADeletedVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  await client.vaults.purgeDeleted("sample-vault", "westus");
}

async function main() {
  await purgeADeletedVault();
}

main().catch(console.error);
