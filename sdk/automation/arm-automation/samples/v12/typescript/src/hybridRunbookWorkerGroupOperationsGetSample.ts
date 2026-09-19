// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a hybrid runbook worker group.
 *
 * @summary retrieve a hybrid runbook worker group.
 * x-ms-original-file: 2024-10-23/getHybridRunbookWorkerGroup.json
 */
async function getAHybridWorkerGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.hybridRunbookWorkerGroupOperations.get(
    "rg",
    "testaccount",
    "TestHybridGroup",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAHybridWorkerGroup();
}

main().catch(console.error);
