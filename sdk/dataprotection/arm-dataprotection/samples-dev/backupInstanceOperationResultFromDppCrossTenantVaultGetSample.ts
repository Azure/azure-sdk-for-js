// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetches the result of a cross-tenant operation (e.g. a cross-tenant restore) for a backup instance of the
 * mapped source vault - the leg the restore's Location header points at. Returns 202 with Location/Retry-After
 * while pending, and 200 with the operation result body when complete.
 *
 * @summary fetches the result of a cross-tenant operation (e.g. a cross-tenant restore) for a backup instance of the
 * mapped source vault - the leg the restore's Location header points at. Returns 202 with Location/Retry-After
 * while pending, and 200 with the operation result body when complete.
 * x-ms-original-file: 2026-08-31-preview/CrossTenantVaultMappingOperations/BackupInstanceOperationResultFromDppCrossTenantVault_Get.json
 */
async function getCrossTenantOperationResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstanceOperationResultFromDppCrossTenantVault.get(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "sampleCrossTenantMapping",
    "testInstance1",
    "YWUzNDFkMzQtZmM5Yy00OGE4LWE5ZDgtY2VhMDAwMDAwMDAw",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getCrossTenantOperationResult();
}

main().catch(console.error);
