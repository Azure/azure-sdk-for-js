// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a jobs credential.
 *
 * @summary gets a jobs credential.
 * x-ms-original-file: 2025-02-01-preview/GetJobCredential.json
 */
async function getACredential() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobCredentials.get("group1", "server1", "agent1", "cred1");
  console.log(result);
}

async function main() {
  await getACredential();
}

main().catch(console.error);
