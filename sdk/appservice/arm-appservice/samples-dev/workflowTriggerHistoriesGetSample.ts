// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a workflow trigger history.
 *
 * @summary gets a workflow trigger history.
 * x-ms-original-file: 2025-05-01/WorkflowTriggerHistories_Get.json
 */
async function getAWorkflowTriggerHistory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.workflowTriggerHistories.get(
    "testResourceGroup",
    "test-name",
    "testWorkflowName",
    "testTriggerName",
    "08586676746934337772206998657CU22",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkflowTriggerHistory();
}

main().catch(console.error);
