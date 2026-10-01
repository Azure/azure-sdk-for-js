// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the watcher by name.
 *
 * @summary delete the watcher by name.
 * x-ms-original-file: 2024-10-23/deleteWatcher.json
 */
async function deleteWatcher(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.watcherOperations.delete("rg", "MyTestAutomationAccount", "MyTestWatcher");
}

async function main(): Promise<void> {
  await deleteWatcher();
}

main().catch(console.error);
