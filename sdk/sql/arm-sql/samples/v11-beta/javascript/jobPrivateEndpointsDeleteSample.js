// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a private endpoint.
 *
 * @summary deletes a private endpoint.
 * x-ms-original-file: 2025-02-01-preview/DeleteJobPrivateEndpoint.json
 */
async function deleteAPrivateEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.jobPrivateEndpoints.delete("group1", "server1", "agent1", "endpoint1");
}

async function main() {
  await deleteAPrivateEndpoint();
}

main().catch(console.error);
