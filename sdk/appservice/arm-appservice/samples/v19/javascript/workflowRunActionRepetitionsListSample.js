// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all of a workflow run action repetitions.
 *
 * @summary get all of a workflow run action repetitions.
 * x-ms-original-file: 2025-05-01/WorkflowRunActionRepetitions_List.json
 */
async function listRepetitions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workflowRunActionRepetitions.list(
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
  await listRepetitions();
}

main().catch(console.error);
