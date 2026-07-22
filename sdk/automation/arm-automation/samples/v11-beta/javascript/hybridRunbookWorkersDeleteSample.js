// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a hybrid runbook worker.
 *
 * @summary delete a hybrid runbook worker.
 * x-ms-original-file: 2024-10-23/deleteHybridRunbookWorker.json
 */
async function deleteAV2HybridRunbookWorker() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.hybridRunbookWorkers.delete(
    "rg",
    "myAutomationAccount20",
    "myGroup",
    "c010ad12-ef14-4a2a-aa9e-ef22c4745ddd",
  );
}

async function main() {
  await deleteAV2HybridRunbookWorker();
}

main().catch(console.error);
