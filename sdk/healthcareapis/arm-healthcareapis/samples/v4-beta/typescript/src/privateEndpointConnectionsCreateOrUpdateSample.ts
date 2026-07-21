// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the state of the specified private endpoint connection associated with the service.
 *
 * @summary update the state of the specified private endpoint connection associated with the service.
 * x-ms-original-file: 2025-04-01-preview/legacy/ServiceCreatePrivateEndpointConnection.json
 */
async function privateEndpointConnectionCreateOrUpdate(): Promise<void> {
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

async function main(): Promise<void> {
  await privateEndpointConnectionCreateOrUpdate();
}

main().catch(console.error);
