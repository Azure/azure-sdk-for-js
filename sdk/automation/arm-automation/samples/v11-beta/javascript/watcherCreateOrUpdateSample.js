// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create the watcher identified by watcher name.
 *
 * @summary create the watcher identified by watcher name.
 * x-ms-original-file: 2024-10-23/createOrUpdateWatcher.json
 */
async function createOrUpdateWatcher() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.watcher.createOrUpdate(
    "rg",
    "MyTestAutomationAccount",
    "MyTestWatcher",
    {
      description: "This is a test watcher.",
      executionFrequencyInSeconds: 60,
      scriptName: "MyTestWatcherRunbook",
      scriptRunOn: "MyTestHybridWorkerGroup",
      tags: {},
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateWatcher();
}

main().catch(console.error);
