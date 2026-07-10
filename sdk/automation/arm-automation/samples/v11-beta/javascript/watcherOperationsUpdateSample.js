// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the watcher identified by watcher name.
 *
 * @summary update the watcher identified by watcher name.
 * x-ms-original-file: 2024-10-23/updateWatcher.json
 */
async function updateWatcher() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.watcherOperations.update(
    "rg",
    "MyTestAutomationAccount",
    "MyTestWatcher",
    { name: "MyTestWatcher", executionFrequencyInSeconds: 600 },
  );
  console.log(result);
}

async function main() {
  await updateWatcher();
}

main().catch(console.error);
