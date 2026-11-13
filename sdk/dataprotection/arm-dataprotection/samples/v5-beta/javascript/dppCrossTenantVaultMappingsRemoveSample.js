// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes a cross-tenant vault mapping from the target vault.
 *
 * @summary removes a cross-tenant vault mapping from the target vault.
 * x-ms-original-file: 2026-08-31-preview/CrossTenantVaultMappingOperations/DppCrossTenantVaultMappings_Remove.json
 */
async function removeACrossTenantVaultMapping() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.dppCrossTenantVaultMappings.remove(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "sampleCrossTenantMapping",
  );
}

async function main() {
  await removeACrossTenantVaultMapping();
}

main().catch(console.error);
