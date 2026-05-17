// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a snapshot.
 *
 * @summary the operation to delete a snapshot.
 * x-ms-original-file: 2026-04-01-preview/Snapshots_Delete.json
 */
async function deleteASnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  await client.snapshots.delete("test-rg", "test-snapshot");
}

async function main() {
  await deleteASnapshot();
}

main().catch(console.error);
