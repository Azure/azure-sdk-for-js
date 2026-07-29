// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of workflow run actions.
 *
 * @summary gets a list of workflow run actions.
 * x-ms-original-file: 2025-05-01/WorkflowRunActions_List.json
 */
async function listAWorkflowRunActions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workflowRunActions.list(
    "test-resource-group",
    "test-name",
    "test-workflow",
    "08586676746934337772206998657CU22",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAWorkflowRunActions();
}

main().catch(console.error);
