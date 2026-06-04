// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeveloperHubServiceClient } = require("@azure/arm-devhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates tags on a workflow.
 *
 * @summary updates tags on a workflow.
 * x-ms-original-file: 2025-03-01-preview/Workflow_UpdateTags.json
 */
async function updateManagedClusterTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.workflow.updateTags("resourceGroup1", "workflow1", {
    tags: { promote: "false", resourceEnv: "testing" },
  });
  console.log(result);
}

async function main() {
  await updateManagedClusterTags();
}

main().catch(console.error);
