// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a deleted backup vault
 *
 * @summary gets a deleted backup vault
 * x-ms-original-file: 2026-03-01/DeletedBackupVaults_Get.json
 */
async function getADeletedBackupVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.deletedBackupVaults.get("westus", "deleted-vault-01");
  console.log(result);
}

async function main() {
  await getADeletedBackupVault();
}

main().catch(console.error);
