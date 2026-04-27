// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates tags on a workflow.
 *
 * @summary updates tags on a workflow.
 * x-ms-original-file: 2025-03-01-preview/Workflow_UpdateTags.json
 */
async function updateManagedClusterTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.workflow.updateTags("resourceGroup1", "workflow1", {
    tags: { promote: "false", resourceEnv: "testing" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateManagedClusterTags();
}

main().catch(console.error);
