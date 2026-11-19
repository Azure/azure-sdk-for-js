// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Microsoft Fabric shortcut.
 *
 * @summary gets a Microsoft Fabric shortcut.
 * x-ms-original-file: 2026-07-01-preview/FabricShortcuts/FabricShortcutGet.json
 */
async function getAFabricShortcut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.fabricShortcuts.get(
    "contoso-rg",
    "contoso-eventhub",
    "orders",
    "orders-shortcut",
  );
  console.log(result);
}

async function main() {
  await getAFabricShortcut();
}

main().catch(console.error);
