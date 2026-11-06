// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a cross-tenant vault mapping under the target vault.
 *
 * @summary creates or updates a cross-tenant vault mapping under the target vault.
 * x-ms-original-file: 2026-08-31-preview/CrossTenantVaultMappingOperations/DppCrossTenantVaultMappings_CreateOrUpdate.json
 */
async function createOrUpdateACrossTenantVaultMapping(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.dppCrossTenantVaultMappings.createOrUpdate(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "sampleCrossTenantMapping",
    {
      properties: {
        sourceVaultId:
          "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/sourceRG/providers/Microsoft.DataProtection/backupVaults/sourceVault",
        resourceGuardOperationRequests: [
          "/subscriptions/04cf684a-d41f-4550-9f70-7708a3a2283b/resourceGroups/000pikumar/providers/Microsoft.DataProtection/backupVaults/PratikPrivatePreviewVault1/backupResourceGuardProxies/swaggerExample",
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateACrossTenantVaultMapping();
}

main().catch(console.error);
