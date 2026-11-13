// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the backup instances of the mapped source vault in a different tenant.
 *
 * @summary lists the backup instances of the mapped source vault in a different tenant.
 * x-ms-original-file: 2026-08-31-preview/CrossTenantVaultMappingOperations/BackupInstancesFromDppCrossTenantVault_List.json
 */
async function listBackupInstancesFromACrossTenantVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupInstancesFromDppCrossTenantVault.list(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "sampleCrossTenantMapping",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listBackupInstancesFromACrossTenantVault();
}

main().catch(console.error);
