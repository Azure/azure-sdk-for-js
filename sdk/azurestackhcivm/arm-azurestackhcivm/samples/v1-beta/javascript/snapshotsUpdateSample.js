// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update a snapshot.
 *
 * @summary the operation to update a snapshot.
 * x-ms-original-file: 2026-04-01-preview/Snapshots_Update.json
 */
async function updateASnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.snapshots.update("test-rg", "test-snapshot", {
    tags: { environment: "production", tier: "standard" },
  });
  console.log(result);
}

async function main() {
  await updateASnapshot();
}

main().catch(console.error);
