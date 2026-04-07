// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a job step. This will implicitly create a new job version.
 *
 * @summary creates or updates a job step. This will implicitly create a new job version.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateJobStepMax.json
 */
async function createOrUpdateAJobStepWithAllPropertiesSpecified(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.jobSteps.createOrUpdate(
    "group1",
    "server1",
    "agent1",
    "job1",
    "step1",
    {
      action: { type: "TSql", source: "Inline", value: "select 2" },
      credential:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/servers/server1/jobAgents/agent1/credentials/cred1",
      executionOptions: {
        initialRetryIntervalSeconds: 11,
        maximumRetryIntervalSeconds: 222,
        retryAttempts: 42,
        retryIntervalBackoffMultiplier: 3,
        timeoutSeconds: 1234,
      },
      output: {
        type: "SqlDatabase",
        credential:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/servers/server1/jobAgents/agent1/credentials/cred0",
        databaseName: "database3",
        resourceGroupName: "group3",
        schemaName: "myschema1234",
        serverName: "server3",
        subscriptionId: "3501b905-a848-4b5d-96e8-b253f62d735a",
        tableName: "mytable5678",
      },
      stepId: 1,
      targetGroup:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/servers/server1/jobAgents/agent1/targetGroups/targetGroup1",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a job step. This will implicitly create a new job version.
 *
 * @summary creates or updates a job step. This will implicitly create a new job version.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateJobStepMin.json
 */
async function createOrUpdateAJobStepWithMinimalPropertiesSpecified(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.jobSteps.createOrUpdate(
    "group1",
    "server1",
    "agent1",
    "job1",
    "step1",
    {
      action: { value: "select 1" },
      targetGroup:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/servers/server1/jobAgents/agent1/targetGroups/targetGroup0",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAJobStepWithAllPropertiesSpecified();
  await createOrUpdateAJobStepWithMinimalPropertiesSpecified();
}

main().catch(console.error);
