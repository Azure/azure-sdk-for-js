// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all executions in a job agent.
 *
 * @summary lists all executions in a job agent.
 * x-ms-original-file: 2025-02-01-preview/ListJobExecutionsByAgent.json
 */
async function listAllJobExecutionsInAJobAgent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobExecutions.listByAgent("group1", "server1", "agent1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all executions in a job agent.
 *
 * @summary lists all executions in a job agent.
 * x-ms-original-file: 2025-02-01-preview/ListJobExecutionsByAgentWithFilter.json
 */
async function listAllJobExecutionsInAJobAgentWithFiltering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobExecutions.listByAgent("group1", "server1", "agent1", {
    createTimeMin: new Date("2017-03-21T19:00:00Z"),
    createTimeMax: new Date("2017-03-21T19:05:00Z"),
    endTimeMin: new Date("2017-03-21T19:20:00Z"),
    endTimeMax: new Date("2017-03-21T19:25:00Z"),
    isActive: false,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllJobExecutionsInAJobAgent();
  await listAllJobExecutionsInAJobAgentWithFiltering();
}

main().catch(console.error);
