// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a job version.
 *
 * @summary gets a job version.
 * x-ms-original-file: 2025-02-01-preview/GetJobVersion.json
 */
async function getAVersionOfAJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.jobVersions.get("group1", "server1", "agent1", "job1", 1);
  console.log(result);
}

async function main(): Promise<void> {
  await getAVersionOfAJob();
}

main().catch(console.error);
