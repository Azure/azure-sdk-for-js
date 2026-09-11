// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create an AiAgentsGroup
 *
 * @summary create an AiAgentsGroup
 * x-ms-original-file: 2026-08-01-preview/AiAgentsGroupsCreateOrUpdate.json
 */
async function createOrUpdateAAiAgentsGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.aiAgentsGroups.createOrUpdate("myResourceGroup", "myAiAgentsGroup", {
    location: "eastus",
    tags: { environment: "test" },
    properties: {
      networkProfile: {
        subnets: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/myVNet/subnets/mySubnet",
          },
        ],
      },
    },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAAiAgentsGroup();
}

main().catch(console.error);
