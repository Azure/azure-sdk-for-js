// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a connected registry with the specified parameters.
 *
 * @summary updates a connected registry with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ConnectedRegistryUpdate.json
 */
async function connectedRegistryUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.connectedRegistries.update(
    "myResourceGroup",
    "myRegistry",
    "myScopeMap",
    {
      properties: {
        syncProperties: {
          schedule: "0 0 */10 * *",
          messageTtl: "P30D",
          syncWindow: "P2D",
        },
        logging: { logLevel: "Debug", auditLogStatus: "Enabled" },
        clientTokenIds: [
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myRegistry/tokens/client1Token",
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myRegistry/tokens/client2Token",
        ],
        notificationsList: ["hello-world:*:*", "sample/repo/*:1.0:*"],
        garbageCollection: { enabled: true, schedule: "0 5 * * *" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await connectedRegistryUpdate();
}

main().catch(console.error);
