// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to approves a Microsoft Fabric shortcut.
 *
 * @summary approves a Microsoft Fabric shortcut.
 * x-ms-original-file: 2026-07-01-preview/FabricShortcuts/FabricShortcutApprove.json
 */
async function approveAFabricShortcut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.fabricShortcuts.approve(
    "contoso-rg",
    "contoso-eventhub",
    "orders",
    "orders-shortcut",
  );
  console.log(result);
}

async function main() {
  await approveAFabricShortcut();
}

main().catch(console.error);
