// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a vault-tier recovery point for a backup instance of the mapped source vault in a different tenant.
 *
 * @summary gets a vault-tier recovery point for a backup instance of the mapped source vault in a different tenant.
 * x-ms-original-file: 2026-08-31-preview/CrossTenantVaultMappingOperations/RecoveryPointFromDppCrossTenantVault_Get.json
 */
async function getARecoveryPointFromACrossTenantVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.recoveryPointFromDppCrossTenantVault.get(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "sampleCrossTenantMapping",
    "testInstance1",
    "hardcodedRP",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getARecoveryPointFromACrossTenantVault();
}

main().catch(console.error);
