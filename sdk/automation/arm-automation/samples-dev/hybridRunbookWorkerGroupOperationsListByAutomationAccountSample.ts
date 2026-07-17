// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of hybrid runbook worker groups.
 *
 * @summary retrieve a list of hybrid runbook worker groups.
 * x-ms-original-file: 2024-10-23/listHybridRunbookWorkerGroup.json
 */
async function listHybridWorkerGroupsByAutomationAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hybridRunbookWorkerGroupOperations.listByAutomationAccount(
    "rg",
    "testaccount",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listHybridWorkerGroupsByAutomationAccount();
}

main().catch(console.error);
