// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Microsoft Fabric shortcut.
 *
 * @summary deletes a Microsoft Fabric shortcut.
 * x-ms-original-file: 2026-07-01-preview/FabricShortcuts/FabricShortcutDelete.json
 */
async function deleteAFabricShortcut() {
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

async function main() {
  await deleteAFabricShortcut();
}

main().catch(console.error);
