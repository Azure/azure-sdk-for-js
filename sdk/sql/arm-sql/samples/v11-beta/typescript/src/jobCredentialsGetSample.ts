// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a jobs credential.
 *
 * @summary gets a jobs credential.
 * x-ms-original-file: 2025-02-01-preview/GetJobCredential.json
 */
async function getACredential(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.jobCredentials.get("group1", "server1", "agent1", "cred1");
  console.log(result);
}

async function main(): Promise<void> {
  await getACredential();
}

main().catch(console.error);
