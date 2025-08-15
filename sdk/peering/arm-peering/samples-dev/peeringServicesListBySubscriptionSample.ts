// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Lists all of the peerings under the given subscription.
 *
 * @summary Lists all of the peerings under the given subscription.
 * x-ms-original-file: specification/peering/resource-manager/Microsoft.Peering/stable/2021-06-01/examples/ListPeeringServicesBySubscription.json
 */
async function listPeeringServicesInASubscription(): Promise<void> {
  const subscriptionId = "subId";
  const credential = new DefaultAzureCredential();
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.peeringServices.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listPeeringServicesInASubscription().catch(console.error);
