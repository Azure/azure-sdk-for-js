// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all private endpoint connections for a private link. Returns the list of private endpoints that are connected or in the process of connecting to this private link.
 *
 * @summary gets all private endpoint connections for a private link. Returns the list of private endpoints that are connected or in the process of connecting to this private link.
 * x-ms-original-file: 2026-01-01/PrivateEndpointConnections/PrivateEndpointConnections_List.json
 */
async function listPrivateEndpointConnections(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list("rg", "pls")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPrivateEndpointConnections();
}

main().catch(console.error);
