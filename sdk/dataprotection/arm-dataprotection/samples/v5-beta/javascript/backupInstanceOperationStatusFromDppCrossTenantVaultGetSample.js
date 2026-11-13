// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status of a cross-tenant operation (e.g. a cross-tenant restore) for a backup instance of the mapped source vault.
 *
 * @summary gets the status of a cross-tenant operation (e.g. a cross-tenant restore) for a backup instance of the mapped source vault.
 * x-ms-original-file: 2026-08-31-preview/CrossTenantVaultMappingOperations/BackupInstanceOperationStatusFromDppCrossTenantVault_Get.json
 */
async function getCrossTenantOperationStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstanceOperationStatusFromDppCrossTenantVault.get(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "sampleCrossTenantMapping",
    "testInstance1",
    "YWUzNDFkMzQtZmM5Yy00OGE4LWE5ZDgtY2VhMDAwMDAwMDAw",
  );
  console.log(result);
}

async function main() {
  await getCrossTenantOperationStatus();
}

main().catch(console.error);
