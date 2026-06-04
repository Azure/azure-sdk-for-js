// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a workflow.
 *
 * @summary gets a workflow.
 * x-ms-original-file: 2025-03-01-preview/Workflow_Get.json
 */
async function getWorkflow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.workflow.get("resourceGroup1", "workflow1");
  console.log(result);
}

async function main(): Promise<void> {
  await getWorkflow();
}

main().catch(console.error);
