// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of workflow trigger histories.
 *
 * @summary gets a list of workflow trigger histories.
 * x-ms-original-file: 2025-05-01/WorkflowTriggerHistories_List.json
 */
async function listAWorkflowTriggerHistory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workflowTriggerHistories.list(
    "testResourceGroup",
    "test-name",
    "testWorkflowName",
    "testTriggerName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAWorkflowTriggerHistory();
}

main().catch(console.error);
