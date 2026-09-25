// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Microsoft Fabric shortcut.
 *
 * @summary deletes a Microsoft Fabric shortcut.
 * x-ms-original-file: 2026-07-01-preview/FabricShortcuts/FabricShortcutDelete.json
 */
async function deleteAFabricShortcut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  await client.fabricShortcuts.delete(
    "contoso-rg",
    "contoso-eventhub",
    "orders",
    "orders-shortcut",
  );
}

async function main(): Promise<void> {
  await deleteAFabricShortcut();
}

main().catch(console.error);
