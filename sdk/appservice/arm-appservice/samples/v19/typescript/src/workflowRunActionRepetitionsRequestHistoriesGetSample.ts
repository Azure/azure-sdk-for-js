// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a workflow run repetition request history.
 *
 * @summary gets a workflow run repetition request history.
 * x-ms-original-file: 2025-05-01/WorkflowRunActionRepetitionsRequestHistories_Get.json
 */
async function getARepetitionRequestHistory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.workflowRunActionRepetitionsRequestHistories.get(
    "test-resource-group",
    "test-name",
    "test-workflow",
    "08586776228332053161046300351",
    "HTTP_Webhook",
    "000001",
    "08586611142732800686",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getARepetitionRequestHistory();
}

main().catch(console.error);
