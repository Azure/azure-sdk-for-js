// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the state of the specified private endpoint connection associated with the service.
 *
 * @summary update the state of the specified private endpoint connection associated with the service.
 * x-ms-original-file: 2025-04-01-preview/legacy/ServiceCreatePrivateEndpointConnection.json
 */
async function privateEndpointConnectionCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.createOrUpdate(
    "rgname",
    "service1",
    "myConnection",
    { privateLinkServiceConnectionState: { description: "Auto-Approved", status: "Approved" } },
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionCreateOrUpdate();
}

main().catch(console.error);
