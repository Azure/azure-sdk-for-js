// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists deleted backup vaults by location
 *
 * @summary lists deleted backup vaults by location
 * x-ms-original-file: 2026-03-01/DeletedBackupVaults_ListByLocation.json
 */
async function listDeletedBackupVaultsByLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedBackupVaults.listByLocation("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDeletedBackupVaultsByLocation();
}

main().catch(console.error);
