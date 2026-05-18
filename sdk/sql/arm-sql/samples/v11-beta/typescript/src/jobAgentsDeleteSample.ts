// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a job agent.
 *
 * @summary deletes a job agent.
 * x-ms-original-file: 2025-02-01-preview/DeleteJobAgent.json
 */
async function deleteAJobAgent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.jobAgents.delete("group1", "server1", "agent1");
}

async function main(): Promise<void> {
  await deleteAJobAgent();
}

main().catch(console.error);
