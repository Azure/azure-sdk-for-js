// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the watcher by name.
 *
 * @summary delete the watcher by name.
 * x-ms-original-file: 2024-10-23/deleteWatcher.json
 */
async function deleteWatcher() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.watcher.delete("rg", "MyTestAutomationAccount", "MyTestWatcher");
}

async function main() {
  await deleteWatcher();
}

main().catch(console.error);
