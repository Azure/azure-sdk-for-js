// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a list of hybrid runbook worker groups.
 *
 * @summary retrieve a list of hybrid runbook worker groups.
 * x-ms-original-file: 2024-10-23/listHybridRunbookWorkerGroup.json
 */
async function listHybridWorkerGroupsByAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hybridRunbookWorkerGroup.listByAutomationAccount(
    "rg",
    "testaccount",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listHybridWorkerGroupsByAutomationAccount();
}

main().catch(console.error);
