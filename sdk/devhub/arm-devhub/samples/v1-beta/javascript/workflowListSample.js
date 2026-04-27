// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeveloperHubServiceClient } = require("@azure/arm-devhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of workflows associated with the specified subscription.
 *
 * @summary gets a list of workflows associated with the specified subscription.
 * x-ms-original-file: 2025-03-01-preview/Workflow_List.json
 */
async function listWorkflows() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workflow.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listWorkflows();
}

main().catch(console.error);
