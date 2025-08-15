// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a workflow.
 *
 * @summary Gets a workflow.
 * x-ms-original-file: specification/developerhub/resource-manager/Microsoft.DevHub/preview/2022-10-11-preview/examples/Workflow_Get.json
 */
async function getWorkflow(): Promise<void> {
  const subscriptionId = process.env["DEVHUB_SUBSCRIPTION_ID"] || "subscriptionId1";
  const resourceGroupName = process.env["DEVHUB_RESOURCE_GROUP"] || "resourceGroup1";
  const workflowName = "workflow1";
  const credential = new DefaultAzureCredential();
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.workflowOperations.get(resourceGroupName, workflowName);
  console.log(result);
}

async function main(): Promise<void> {
  await getWorkflow();
}

main().catch(console.error);
