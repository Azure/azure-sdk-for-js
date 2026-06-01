// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to runs a workflow trigger.
 *
 * @summary runs a workflow trigger.
 * x-ms-original-file: 2025-05-01/WorkflowTriggers_Run.json
 */
async function runAWorkflowTrigger() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.workflowTriggers.run(
    "test-resource-group",
    "test-name",
    "test-workflow",
    "recurrence",
  );
}

async function main() {
  await runAWorkflowTrigger();
}

main().catch(console.error);
