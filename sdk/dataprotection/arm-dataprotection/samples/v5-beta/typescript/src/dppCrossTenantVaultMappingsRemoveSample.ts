// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to removes a cross-tenant vault mapping from the target vault.
 *
 * @summary removes a cross-tenant vault mapping from the target vault.
 * x-ms-original-file: 2026-08-31-preview/CrossTenantVaultMappingOperations/DppCrossTenantVaultMappings_Remove.json
 */
async function removeACrossTenantVaultMapping(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.dppCrossTenantVaultMappings.remove(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "sampleCrossTenantMapping",
  );
}

async function main(): Promise<void> {
  await removeACrossTenantVaultMapping();
}

main().catch(console.error);
