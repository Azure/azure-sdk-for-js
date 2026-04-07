// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of job agents in a server.
 *
 * @summary gets a list of job agents in a server.
 * x-ms-original-file: 2025-02-01-preview/ListJobAgentsByServer.json
 */
async function listJobAgentsInAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobAgents.listByServer("group1", "server1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listJobAgentsInAServer();
}

main().catch(console.error);
