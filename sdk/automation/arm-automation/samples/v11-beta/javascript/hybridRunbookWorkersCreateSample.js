// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a hybrid runbook worker.
 *
 * @summary create a hybrid runbook worker.
 * x-ms-original-file: 2024-10-23/putHybridRunbookWorker.json
 */
async function createAV2HybridRunbookWorker() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.hybridRunbookWorkers.create(
    "rg",
    "testaccount",
    "TestHybridGroup",
    "c010ad12-ef14-4a2a-aa9e-ef22c4745ddd",
    {
      vmResourceId:
        "/subscriptions/vmsubid/resourceGroups/vmrg/providers/Microsoft.Compute/virtualMachines/vmname",
    },
  );
  console.log(result);
}

async function main() {
  await createAV2HybridRunbookWorker();
}

main().catch(console.error);
