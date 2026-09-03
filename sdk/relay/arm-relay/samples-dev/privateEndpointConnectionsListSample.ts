// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the available PrivateEndpointConnections within a namespace.
 *
 * @summary gets the available PrivateEndpointConnections within a namespace.
 * x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateEndpointConnectionsList.json
 */
async function privateEndpointConnectionsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list(
    "myResourceGroup",
    "example-RelayNamespace-5849",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsList();
}

main().catch(console.error);
