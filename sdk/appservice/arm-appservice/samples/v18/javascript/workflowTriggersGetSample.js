// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a workflow trigger.
 *
 * @summary gets a workflow trigger.
 * x-ms-original-file: 2025-05-01/WorkflowTriggers_Get.json
 */
async function getAWorkflowTrigger() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.workflowTriggers.get(
    "test-resource-group",
    "test-name",
    "test-workflow",
    "manual",
  );
  console.log(result);
}

async function main() {
  await getAWorkflowTrigger();
}

main().catch(console.error);
