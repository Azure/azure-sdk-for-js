// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available peering locations for the specified kind of peering.
 *
 * @summary lists all of the available peering locations for the specified kind of peering.
 * x-ms-original-file: 2025-05-01/ListDirectPeeringLocations.json
 */
async function listDirectPeeringLocations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.peeringLocations.list("Direct")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all of the available peering locations for the specified kind of peering.
 *
 * @summary lists all of the available peering locations for the specified kind of peering.
 * x-ms-original-file: 2025-05-01/ListExchangePeeringLocations.json
 */
async function listExchangePeeringLocations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.peeringLocations.list("Exchange")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDirectPeeringLocations();
  await listExchangePeeringLocations();
}

main().catch(console.error);
