// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a connected registry for a container registry with the specified parameters.
 *
 * @summary creates a connected registry for a container registry with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ConnectedRegistryCreate.json
 */
async function connectedRegistryCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.connectedRegistries.create(
    "myResourceGroup",
    "myRegistry",
    "myConnectedRegistry",
    {
      properties: {
        mode: "ReadWrite",
        parent: {
          syncProperties: {
            tokenId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myRegistry/tokens/syncToken",
            schedule: "0 9 * * *",
            messageTtl: "P2D",
            syncWindow: "PT3H",
          },
        },
        clientTokenIds: [
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myRegistry/tokens/client1Token",
        ],
        notificationsList: ["hello-world:*:*", "sample/repo/*:1.0:*"],
        garbageCollection: { enabled: true, schedule: "0 5 * * *" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await connectedRegistryCreate();
}

main().catch(console.error);
