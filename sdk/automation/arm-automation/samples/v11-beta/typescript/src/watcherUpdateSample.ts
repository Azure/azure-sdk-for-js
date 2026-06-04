// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the watcher identified by watcher name.
 *
 * @summary update the watcher identified by watcher name.
 * x-ms-original-file: 2024-10-23/updateWatcher.json
 */
async function updateWatcher(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.watcher.update("rg", "MyTestAutomationAccount", "MyTestWatcher", {
    name: "MyTestWatcher",
    executionFrequencyInSeconds: 600,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateWatcher();
}

main().catch(console.error);
