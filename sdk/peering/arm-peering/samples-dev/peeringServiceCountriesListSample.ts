// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available countries for peering service.
 *
 * @summary Lists all of the available countries for peering service.
 * x-ms-original-file: specification/peering/resource-manager/Microsoft.Peering/stable/2021-06-01/examples/ListPeeringServiceCountriesBySubscription.json
 */

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

async function listPeeringServiceCountries(): Promise<void> {
  const subscriptionId = "subId";
  const credential = new DefaultAzureCredential();
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.peeringServiceCountries.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listPeeringServiceCountries().catch(console.error);
