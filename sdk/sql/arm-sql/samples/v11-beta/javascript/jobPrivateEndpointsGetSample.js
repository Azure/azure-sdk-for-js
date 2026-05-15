// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a private endpoint.
 *
 * @summary gets a private endpoint.
 * x-ms-original-file: 2025-02-01-preview/GetJobPrivateEndpoint.json
 */
async function getAPrivateEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobPrivateEndpoints.get("group1", "server1", "agent1", "endpoint1");
  console.log(result);
}

async function main() {
  await getAPrivateEndpoint();
}

main().catch(console.error);
