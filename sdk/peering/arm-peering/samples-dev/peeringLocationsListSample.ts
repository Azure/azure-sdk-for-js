// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available peering locations for the specified kind of peering.
 *
 * @summary Lists all of the available peering locations for the specified kind of peering.
 * x-ms-original-file: specification/peering/resource-manager/Microsoft.Peering/stable/2021-06-01/examples/ListDirectPeeringLocations.json
 */

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

async function listDirectPeeringLocations(): Promise<void> {
  const subscriptionId = "subId";
  const kind = "Direct";
  const credential = new DefaultAzureCredential();
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.peeringLocations.list(kind)) {
    resArray.push(item);
  }
  console.log(resArray);
}

listDirectPeeringLocations().catch(console.error);

/**
 * This sample demonstrates how to Lists all of the available peering locations for the specified kind of peering.
 *
 * @summary Lists all of the available peering locations for the specified kind of peering.
 * x-ms-original-file: specification/peering/resource-manager/Microsoft.Peering/stable/2021-06-01/examples/ListExchangePeeringLocations.json
 */
async function listExchangePeeringLocations(): Promise<void> {
  const subscriptionId = "subId";
  const kind = "Exchange";
  const credential = new DefaultAzureCredential();
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.peeringLocations.list(kind)) {
    resArray.push(item);
  }
  console.log(resArray);
}

listExchangePeeringLocations().catch(console.error);
