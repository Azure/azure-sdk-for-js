// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a hybrid runbook worker group.
 *
 * @summary update a hybrid runbook worker group.
 * x-ms-original-file: 2024-10-23/updateHybridRunbookWorkerGroup.json
 */
async function updateHybridWorkerGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.hybridRunbookWorkerGroup.update(
    "rg",
    "testaccount",
    "TestHybridGroup",
    { credential: { name: "myRunAsCredentialUpdatedName" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateHybridWorkerGroup();
}

main().catch(console.error);
