// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to move a hybrid worker to a different group.
 *
 * @summary move a hybrid worker to a different group.
 * x-ms-original-file: 2024-10-23/moveHybridRunbookWorker.json
 */
async function moveAV2HybridWorkerToADifferentGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.hybridRunbookWorkers.move(
    "rg",
    "testaccount",
    "TestHybridGroup",
    "c010ad12-ef14-4a2a-aa9e-ef22c4745ddd",
    { hybridRunbookWorkerGroupName: "TestHybridGroup2" },
  );
}

async function main(): Promise<void> {
  await moveAV2HybridWorkerToADifferentGroup();
}

main().catch(console.error);
