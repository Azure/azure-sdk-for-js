// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the vault-tier recovery points for a backup instance of the mapped source vault in a different tenant.
 *
 * @summary lists the vault-tier recovery points for a backup instance of the mapped source vault in a different tenant.
 * x-ms-original-file: 2026-08-31-preview/CrossTenantVaultMappingOperations/RecoveryPointsFromDppCrossTenantVault_List.json
 */
async function listRecoveryPointsFromACrossTenantVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recoveryPointsFromDppCrossTenantVault.list(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "sampleCrossTenantMapping",
    "testInstance1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRecoveryPointsFromACrossTenantVault();
}

main().catch(console.error);
