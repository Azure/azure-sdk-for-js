// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists Microsoft Fabric shortcuts for an Event Hub.
 *
 * @summary lists Microsoft Fabric shortcuts for an Event Hub.
 * x-ms-original-file: 2026-07-01-preview/FabricShortcuts/FabricShortcutList.json
 */
async function listFabricShortcutsForAnEventHub() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fabricShortcuts.listByEventHub(
    "contoso-rg",
    "contoso-eventhub",
    "orders",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listFabricShortcutsForAnEventHub();
}

main().catch(console.error);
