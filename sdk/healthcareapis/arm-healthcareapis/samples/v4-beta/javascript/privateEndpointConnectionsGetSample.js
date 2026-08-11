// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the service.
 *
 * @summary gets the specified private endpoint connection associated with the service.
 * x-ms-original-file: 2025-04-01-preview/legacy/ServiceGetPrivateEndpointConnection.json
 */
async function privateEndpointConnectionGetConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get("rgname", "service1", "myConnection");
  console.log(result);
}

async function main() {
  await privateEndpointConnectionGetConnection();
}

main().catch(console.error);
