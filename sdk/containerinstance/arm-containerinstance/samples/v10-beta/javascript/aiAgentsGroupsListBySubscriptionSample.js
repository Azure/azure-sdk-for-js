// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AiAgentsGroup resources by subscription ID
 *
 * @summary list AiAgentsGroup resources by subscription ID
 * x-ms-original-file: 2026-08-01-preview/AiAgentsGroupsListBySubscription.json
 */
async function listAiAgentsGroupsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.aiAgentsGroups.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAiAgentsGroupsBySubscription();
}

main().catch(console.error);
