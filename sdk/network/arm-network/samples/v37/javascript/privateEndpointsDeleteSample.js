// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified private endpoint.
 *
 * @summary deletes the specified private endpoint.
 * x-ms-original-file: 2025-05-01/PrivateEndpointDelete.json
 */
async function deletePrivateEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.privateEndpoints.delete("rg1", "testPe");
}

async function main() {
  await deletePrivateEndpoint();
}

main().catch(console.error);
