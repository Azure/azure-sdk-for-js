// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a job version.
 *
 * @summary gets a job version.
 * x-ms-original-file: 2025-02-01-preview/GetJobVersion.json
 */
async function getAVersionOfAJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobVersions.get("group1", "server1", "agent1", "job1", 1);
  console.log(result);
}

async function main() {
  await getAVersionOfAJob();
}

main().catch(console.error);
