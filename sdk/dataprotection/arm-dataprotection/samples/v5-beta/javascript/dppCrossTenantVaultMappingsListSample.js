// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the cross-tenant vault mappings under the target vault.
 *
 * @summary lists the cross-tenant vault mappings under the target vault.
 * x-ms-original-file: 2026-08-31-preview/CrossTenantVaultMappingOperations/DppCrossTenantVaultMappings_List.json
 */
async function listCrossTenantVaultMappingsInAVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dppCrossTenantVaultMappings.list(
    "000pikumar",
    "PratikPrivatePreviewVault1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCrossTenantVaultMappingsInAVault();
}

main().catch(console.error);
