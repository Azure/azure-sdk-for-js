// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a hybrid runbook worker group.
 *
 * @summary create a hybrid runbook worker group.
 * x-ms-original-file: 2024-10-23/putHybridRunbookWorkerGroup.json
 */
async function createAHybridWorkerGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.hybridRunbookWorkerGroup.create(
    "rg",
    "testaccount",
    "TestHybridGroup",
    { credential: { name: "myRunAsCredentialName" } },
  );
  console.log(result);
}

async function main() {
  await createAHybridWorkerGroup();
}

main().catch(console.error);
