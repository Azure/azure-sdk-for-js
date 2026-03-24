// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resubmits a workflow run based on the trigger history.
 *
 * @summary resubmits a workflow run based on the trigger history.
 * x-ms-original-file: 2025-05-01/WorkflowTriggerHistories_Resubmit.json
 */
async function resubmitAWorkflowRunBasedOnTheTriggerHistory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.workflowTriggerHistories.resubmit(
    "testResourceGroup",
    "test-name",
    "testWorkflowName",
    "testTriggerName",
    "testHistoryName",
  );
}

async function main(): Promise<void> {
  await resubmitAWorkflowRunBasedOnTheTriggerHistory();
}

main().catch(console.error);
