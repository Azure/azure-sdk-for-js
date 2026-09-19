// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a list of watchers.
 *
 * @summary retrieve a list of watchers.
 * x-ms-original-file: 2024-10-23/listWatchersByAutomationAccount.json
 */
async function listWatchersByAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.watcherOperations.listByAutomationAccount(
    "rg",
    "MyTestAutomationAccount",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listWatchersByAutomationAccount();
}

main().catch(console.error);
