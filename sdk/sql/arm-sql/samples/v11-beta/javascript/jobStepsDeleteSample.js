// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a job step. This will implicitly create a new job version.
 *
 * @summary deletes a job step. This will implicitly create a new job version.
 * x-ms-original-file: 2025-02-01-preview/DeleteJobStep.json
 */
async function deleteAJobStep() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.jobSteps.delete("group1", "server1", "agent1", "job1", "step1");
}

async function main() {
  await deleteAJobStep();
}

main().catch(console.error);
