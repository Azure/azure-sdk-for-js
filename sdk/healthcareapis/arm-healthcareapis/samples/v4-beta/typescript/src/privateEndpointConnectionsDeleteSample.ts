// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a private endpoint connection.
 *
 * @summary deletes a private endpoint connection.
 * x-ms-original-file: 2025-04-01-preview/legacy/ServiceDeletePrivateEndpointConnection.json
 */
async function privateEndpointConnectionsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete("rgname", "service1", "myConnection");
}

async function main(): Promise<void> {
  await privateEndpointConnectionsDelete();
}

main().catch(console.error);
