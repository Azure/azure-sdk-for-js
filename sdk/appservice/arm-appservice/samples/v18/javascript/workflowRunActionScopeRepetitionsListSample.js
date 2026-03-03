// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the workflow run action scoped repetitions.
 *
 * @summary list the workflow run action scoped repetitions.
 * x-ms-original-file: 2025-05-01/WorkflowRunActionScopeRepetitions_List.json
 */
async function listTheScopedRepetitions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workflowRunActionScopeRepetitions.list(
    "testResourceGroup",
    "test-name",
    "testFlow",
    "08586776228332053161046300351",
    "for_each",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheScopedRepetitions();
}

main().catch(console.error);
