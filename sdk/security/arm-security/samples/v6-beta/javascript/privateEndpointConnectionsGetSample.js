// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the private link. Returns the connection details, status, and configuration for a specific private endpoint.
 *
 * @summary gets the specified private endpoint connection associated with the private link. Returns the connection details, status, and configuration for a specific private endpoint.
 * x-ms-original-file: 2026-01-01/PrivateEndpointConnections/PrivateEndpointConnections_Get.json
 */
async function getPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get("rg", "pls", "pe");
  console.log(result);
}

async function main() {
  await getPrivateEndpointConnection();
}

main().catch(console.error);
