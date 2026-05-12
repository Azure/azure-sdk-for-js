// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements GuestAgent DELETE method.
 *
 * @summary implements GuestAgent DELETE method.
 * x-ms-original-file: 2026-04-01-preview/GuestAgents_Delete.json
 */
async function deleteGuestAgent() {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIVMManagementClient(credential);
  await client.guestAgents.delete(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
  );
}

async function main() {
  await deleteGuestAgent();
}

main().catch(console.error);
