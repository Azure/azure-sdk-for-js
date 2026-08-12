// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resume the watcher identified by watcher name.
 *
 * @summary resume the watcher identified by watcher name.
 * x-ms-original-file: 2024-10-23/stopWatcher.json
 */
async function startWatcher() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.watcherOperations.stop("rg", "MyTestAutomationAccount", "MyTestWatcher");
}

async function main() {
  await startWatcher();
}

main().catch(console.error);
