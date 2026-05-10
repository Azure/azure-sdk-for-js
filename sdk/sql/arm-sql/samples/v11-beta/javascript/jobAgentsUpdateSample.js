// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a job agent.
 *
 * @summary updates a job agent.
 * x-ms-original-file: 2025-02-01-preview/UpdateJobAgent.json
 */
async function updateAJobAgentTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobAgents.update("group1", "server1", "agent1", {
    tags: { mytag1: "myvalue1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a job agent.
 *
 * @summary updates a job agent.
 * x-ms-original-file: 2025-02-01-preview/UpdateJobAgentWithIdentity.json
 */
async function updateAJobAgentIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobAgents.update("group1", "server1", "agent1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-umi":
          {},
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a job agent.
 *
 * @summary updates a job agent.
 * x-ms-original-file: 2025-02-01-preview/UpdateJobAgentWithSku.json
 */
async function updateAJobAgentSku() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobAgents.update("group1", "server1", "agent1", {
    sku: { name: "JA200" },
  });
  console.log(result);
}

async function main() {
  await updateAJobAgentTags();
  await updateAJobAgentIdentity();
  await updateAJobAgentSku();
}

main().catch(console.error);
