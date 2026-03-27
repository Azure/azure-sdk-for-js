// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a workflow run action repetition.
 *
 * @summary get a workflow run action repetition.
 * x-ms-original-file: 2025-05-01/WorkflowRunActionRepetitions_Get.json
 */
async function getARepetition() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.workflowRunActionRepetitions.get(
    "testResourceGroup",
    "test-name",
    "testFlow",
    "08586776228332053161046300351",
    "testAction",
    "000001",
  );
  console.log(result);
}

async function main() {
  await getARepetition();
}

main().catch(console.error);
