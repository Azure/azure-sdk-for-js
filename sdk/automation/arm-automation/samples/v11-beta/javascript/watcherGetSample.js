// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the watcher identified by watcher name.
 *
 * @summary retrieve the watcher identified by watcher name.
 * x-ms-original-file: 2024-10-23/getWatcher.json
 */
async function getWatcher() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.watcher.get("rg", "MyTestAutomationAccount", "MyTestWatcher");
  console.log(result);
}

async function main() {
  await getWatcher();
}

main().catch(console.error);
