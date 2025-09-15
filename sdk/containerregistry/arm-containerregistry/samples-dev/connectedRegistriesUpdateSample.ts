// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a connected registry with the specified parameters.
 *
 * @summary updates a connected registry with the specified parameters.
 * x-ms-original-file: 2025-05-01-preview/ConnectedRegistryUpdate.json
 */
async function connectedRegistryUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.connectedRegistries.update(
    "myResourceGroup",
    "myRegistry",
    "myScopeMap",
    {
      properties: {
        clientTokenIds: [
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myRegistry/tokens/client1Token",
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myRegistry/tokens/client2Token",
        ],
        garbageCollection: { enabled: true, schedule: "0 5 * * *" },
        logging: { auditLogStatus: "Enabled", logLevel: "Debug" },
        notificationsList: ["hello-world:*:*", "sample/repo/*:1.0:*"],
        syncProperties: {
          messageTtl: "P30D",
          schedule: "0 0 */10 * *",
          syncWindow: "P2D",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await connectedRegistryUpdate();
}

main().catch(console.error);
