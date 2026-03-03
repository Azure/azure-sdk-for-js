// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels a workflow run.
 *
 * @summary cancels a workflow run.
 * x-ms-original-file: 2025-05-01/WorkflowRuns_Cancel.json
 */
async function cancelAWorkflowRun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.workflowRuns.cancel(
    "test-resource-group",
    "test-name",
    "test-workflow",
    "08586676746934337772206998657CU22",
  );
}

async function main(): Promise<void> {
  await cancelAWorkflowRun();
}

main().catch(console.error);
