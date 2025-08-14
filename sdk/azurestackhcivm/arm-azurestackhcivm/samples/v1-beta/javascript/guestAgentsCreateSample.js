// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create Or Update GuestAgent.
 *
 * @summary create Or Update GuestAgent.
 * x-ms-original-file: 2025-06-01-preview/GuestAgents_Create.json
 */
async function createGuestAgent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.guestAgents.create(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
    {
      properties: {
        credentials: { password: "<password>", username: "tempuser" },
        provisioningAction: "install",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createGuestAgent();
}

main().catch(console.error);
