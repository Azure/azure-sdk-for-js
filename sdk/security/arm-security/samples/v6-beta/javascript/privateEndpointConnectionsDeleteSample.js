// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the private link. This operation will disconnect the private endpoint and remove the connection configuration.
 *
 * @summary deletes the specified private endpoint connection associated with the private link. This operation will disconnect the private endpoint and remove the connection configuration.
 * x-ms-original-file: 2026-01-01/PrivateEndpointConnections/PrivateEndpointConnections_Delete.json
 */
async function deletePrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.privateEndpointConnections.delete("rg", "pls", "pe");
}

async function main() {
  await deletePrivateEndpointConnection();
}

main().catch(console.error);
