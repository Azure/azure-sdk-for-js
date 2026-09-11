// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an AiAgentsGroup
 *
 * @summary delete an AiAgentsGroup
 * x-ms-original-file: 2026-08-01-preview/AiAgentsGroupsDelete.json
 */
async function deleteAAiAgentsGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  await client.aiAgentsGroups.delete("myResourceGroup", "myAiAgentsGroup");
}

async function main() {
  await deleteAAiAgentsGroup();
}

main().catch(console.error);
