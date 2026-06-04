// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a hybrid runbook worker group.
 *
 * @summary delete a hybrid runbook worker group.
 * x-ms-original-file: 2024-10-23/deleteHybridRunbookWorkerGroup.json
 */
async function deleteAHybridWorkerGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.hybridRunbookWorkerGroup.delete("rg", "myAutomationAccount20", "myGroup");
}

async function main() {
  await deleteAHybridWorkerGroup();
}

main().catch(console.error);
