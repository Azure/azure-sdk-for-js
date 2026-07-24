// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Microsoft Fabric shortcut.
 *
 * @summary creates or updates a Microsoft Fabric shortcut.
 * x-ms-original-file: 2026-07-01-preview/FabricShortcuts/FabricShortcutCreate.json
 */
async function createOrUpdateAFabricShortcut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.fabricShortcuts.createOrUpdate(
    "contoso-rg",
    "contoso-eventhub",
    "orders",
    "orders-shortcut",
    {
      properties: {
        configuration: {
          artifactId: "33333333-3333-3333-3333-333333333333",
          artifactName: "orders-eventstream",
          premiumCapacityId: "44444444-4444-4444-4444-444444444444",
          tenantId: "11111111-1111-1111-1111-111111111111",
          workspaceId: "22222222-2222-2222-2222-222222222222",
          workspaceName: "contoso-workspace",
        },
        shortcutStatus: "Pending",
        shortcutType: "Entity",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAFabricShortcut();
}

main().catch(console.error);
