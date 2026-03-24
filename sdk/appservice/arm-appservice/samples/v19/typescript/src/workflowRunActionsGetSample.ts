// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a workflow run action.
 *
 * @summary gets a workflow run action.
 * x-ms-original-file: 2025-05-01/WorkflowRunActions_Get.json
 */
async function getAWorkflowRunAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.workflowRunActions.get(
    "test-resource-group",
    "test-name",
    "test-workflow",
    "08586676746934337772206998657CU22",
    "HTTP",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkflowRunAction();
}

main().catch(console.error);
