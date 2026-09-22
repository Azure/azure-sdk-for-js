// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a hybrid runbook worker group.
 *
 * @summary update a hybrid runbook worker group.
 * x-ms-original-file: 2024-10-23/updateHybridRunbookWorkerGroup.json
 */
async function updateHybridWorkerGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.hybridRunbookWorkerGroupOperations.update(
    "rg",
    "testaccount",
    "TestHybridGroup",
    { credential: { name: "myRunAsCredentialUpdatedName" } },
  );
  console.log(result);
}

async function main() {
  await updateHybridWorkerGroup();
}

main().catch(console.error);
