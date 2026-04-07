// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a job agent.
 *
 * @summary deletes a job agent.
 * x-ms-original-file: 2025-02-01-preview/DeleteJobAgent.json
 */
async function deleteAJobAgent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.jobAgents.delete("group1", "server1", "agent1");
}

async function main() {
  await deleteAJobAgent();
}

main().catch(console.error);
