// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all private endpoint connections for a service.
 *
 * @summary lists all private endpoint connections for a service.
 * x-ms-original-file: 2025-04-01-preview/legacy/ServiceListPrivateEndpointConnections.json
 */
async function privateEndpointConnectionList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByService("rgname", "service1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await privateEndpointConnectionList();
}

main().catch(console.error);
