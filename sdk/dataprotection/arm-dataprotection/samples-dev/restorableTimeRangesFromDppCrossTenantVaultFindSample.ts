// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to finds the restorable time ranges for a backup instance of the mapped source vault in a different tenant.
 *
 * @summary finds the restorable time ranges for a backup instance of the mapped source vault in a different tenant.
 * x-ms-original-file: 2026-08-31-preview/CrossTenantVaultMappingOperations/RestorableTimeRangesFromDppCrossTenantVault_Find.json
 */
async function findRestorableTimeRangesFromACrossTenantVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.restorableTimeRangesFromDppCrossTenantVault.find(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "sampleCrossTenantMapping",
    "testInstance1",
    {
      endTime: "2021-02-24T00:35:17.6829685Z",
      sourceDataStoreType: "OperationalStore",
      startTime: "2020-10-17T23:28:17.6829685Z",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await findRestorableTimeRangesFromACrossTenantVault();
}

main().catch(console.error);
