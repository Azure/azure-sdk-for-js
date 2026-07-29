// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list a workflow run repetition request history.
 *
 * @summary list a workflow run repetition request history.
 * x-ms-original-file: 2025-05-01/WorkflowRunActionRepetitionsRequestHistories_List.json
 */
async function listRepetitionRequestHistory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workflowRunActionRepetitionsRequestHistories.list(
    "test-resource-group",
    "test-name",
    "test-workflow",
    "08586776228332053161046300351",
    "HTTP_Webhook",
    "000001",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRepetitionRequestHistory();
}

main().catch(console.error);
