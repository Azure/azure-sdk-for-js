// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to runs a workflow trigger.
 *
 * @summary runs a workflow trigger.
 * x-ms-original-file: 2025-05-01/WorkflowTriggers_Run.json
 */
async function runAWorkflowTrigger(): Promise<void> {
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

async function main(): Promise<void> {
  await runAWorkflowTrigger();
}

main().catch(console.error);
