// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists a workflow run expression trace.
 *
 * @summary lists a workflow run expression trace.
 * x-ms-original-file: 2025-05-01/WorkflowRunActions_ListExpressionTraces.json
 */
async function listExpressionTraces() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workflowRunActions.listExpressionTraces(
    "testResourceGroup",
    "test-name",
    "testFlow",
    "08586776228332053161046300351",
    "testAction",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listExpressionTraces();
}

main().catch(console.error);
