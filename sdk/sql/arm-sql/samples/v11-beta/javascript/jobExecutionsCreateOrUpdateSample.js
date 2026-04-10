// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a job execution.
 *
 * @summary creates or updates a job execution.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateJobExecution.json
 */
async function createJobExecution() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobExecutions.createOrUpdate(
    "group1",
    "server1",
    "agent1",
    "job1",
    "5A86BF65-43AC-F258-2524-9E92992F97CA",
  );
  console.log(result);
}

async function main() {
  await createJobExecution();
}

main().catch(console.error);
