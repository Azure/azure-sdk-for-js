// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all private end point connections for a specific private link service.
 *
 * @summary gets all private end point connections for a specific private link service.
 * x-ms-original-file: 2025-05-01/PrivateLinkServiceListPrivateEndpointConnection.json
 */
async function listPrivateLinkServiceInResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkServices.listPrivateEndpointConnections(
    "rg1",
    "testPls",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPrivateLinkServiceInResourceGroup();
}

main().catch(console.error);
