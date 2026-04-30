// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a job agent.
 *
 * @summary creates or updates a job agent.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateJobAgent.json
 */
async function createOrUpdateAJobAgent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobAgents.createOrUpdate("group1", "server1", "agent1", {
    location: "southeastasia",
    databaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/servers/server1/databases/db1",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a job agent.
 *
 * @summary creates or updates a job agent.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateJobAgentWithIdentity.json
 */
async function createOrUpdateAJobAgentWithIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobAgents.createOrUpdate("group1", "server1", "agent1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-umi":
          {},
      },
    },
    location: "southeastasia",
    databaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/servers/server1/databases/db1",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a job agent.
 *
 * @summary creates or updates a job agent.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateJobAgentWithSku.json
 */
async function createOrUpdateAJobAgentWithSku(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobAgents.createOrUpdate("group1", "server1", "agent1", {
    location: "southeastasia",
    databaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/servers/server1/databases/db1",
    sku: { name: "JA400" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAJobAgent();
  await createOrUpdateAJobAgentWithIdentity();
  await createOrUpdateAJobAgentWithSku();
}

main().catch(console.error);
