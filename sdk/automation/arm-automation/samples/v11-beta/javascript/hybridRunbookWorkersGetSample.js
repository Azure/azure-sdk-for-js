// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a hybrid runbook worker.
 *
 * @summary retrieve a hybrid runbook worker.
 * x-ms-original-file: 2024-10-23/getHybridRunbookWorker.json
 */
async function getAV2HybridRunbookWorker() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.hybridRunbookWorkers.get(
    "rg",
    "testaccount",
    "TestHybridGroup",
    "c010ad12-ef14-4a2a-aa9e-ef22c4745ddd",
  );
  console.log(result);
}

async function main() {
  await getAV2HybridRunbookWorker();
}

main().catch(console.error);
