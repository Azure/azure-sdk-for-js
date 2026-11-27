// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a cross-tenant vault mapping by name from the target vault.
 *
 * @summary gets a cross-tenant vault mapping by name from the target vault.
 * x-ms-original-file: 2026-08-31-preview/CrossTenantVaultMappingOperations/DppCrossTenantVaultMappings_Get.json
 */
async function getACrossTenantVaultMapping() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.dppCrossTenantVaultMappings.get(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "sampleCrossTenantMapping",
  );
  console.log(result);
}

async function main() {
  await getACrossTenantVaultMapping();
}

main().catch(console.error);
