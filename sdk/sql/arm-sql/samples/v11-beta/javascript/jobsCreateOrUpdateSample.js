// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a job.
 *
 * @summary creates or updates a job.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateJobMax.json
 */
async function createAJobWithAllPropertiesSpecified() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobs.createOrUpdate("group1", "server1", "agent1", "job1", {
    description: "my favourite job",
    schedule: {
      type: "Recurring",
      enabled: true,
      endTime: new Date("2015-09-24T23:59:59Z"),
      interval: "PT5M",
      startTime: new Date("2015-09-24T18:30:01Z"),
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a job.
 *
 * @summary creates or updates a job.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateJobMin.json
 */
async function createAJobWithDefaultProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobs.createOrUpdate("group1", "server1", "agent1", "job1", {});
  console.log(result);
}

async function main() {
  await createAJobWithAllPropertiesSpecified();
  await createAJobWithDefaultProperties();
}

main().catch(console.error);
