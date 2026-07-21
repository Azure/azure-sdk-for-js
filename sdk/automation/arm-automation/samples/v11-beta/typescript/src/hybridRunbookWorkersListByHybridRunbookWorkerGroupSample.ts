// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of hybrid runbook workers.
 *
 * @summary retrieve a list of hybrid runbook workers.
 * x-ms-original-file: 2024-10-23/listHybridRunbookWorker.json
 */
async function listHybridWorkersByHybridRunbookWorkerGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hybridRunbookWorkers.listByHybridRunbookWorkerGroup(
    "rg",
    "testaccount",
    "TestHybridGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listHybridWorkersByHybridRunbookWorkerGroup();
}

main().catch(console.error);
