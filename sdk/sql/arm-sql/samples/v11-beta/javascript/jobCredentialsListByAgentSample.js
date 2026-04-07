// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of jobs credentials.
 *
 * @summary gets a list of jobs credentials.
 * x-ms-original-file: 2025-02-01-preview/ListJobCredentialsByAgent.json
 */
async function listCredentialsInAJobAgent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobCredentials.listByAgent("group1", "server1", "agent1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCredentialsInAJobAgent();
}

main().catch(console.error);
