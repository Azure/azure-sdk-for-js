// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status (Active/Inactive) of a cross-tenant vault mapping from the source vault side.
 *
 * @summary gets the status (Active/Inactive) of a cross-tenant vault mapping from the source vault side.
 * x-ms-original-file: 2026-08-31-preview/CrossTenantVaultMappingOperations/DppCrossTenantVaultMappingStatus_Check.json
 */
async function getCrossTenantVaultMappingStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.dppCrossTenantVaultMappingStatus.check(
    "000pikumar",
    "PratikPrivatePreviewVault1",
  );
  console.log(result);
}

async function main() {
  await getCrossTenantVaultMappingStatus();
}

main().catch(console.error);
