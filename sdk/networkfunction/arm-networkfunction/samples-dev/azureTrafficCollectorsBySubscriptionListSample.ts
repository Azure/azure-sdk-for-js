// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Return list of Azure Traffic Collectors in a subscription
 *
 * @summary Return list of Azure Traffic Collectors in a subscription
 * x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorsBySubscriptionList.json
 */

import { AzureTrafficCollectorClient } from "@azure/arm-networkfunction";
import { DefaultAzureCredential } from "@azure/identity";

async function listOfTrafficCollectorsBySubscription(): Promise<void> {
  const subscriptionId = "subid";
  const credential = new DefaultAzureCredential();
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureTrafficCollectorsBySubscription.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listOfTrafficCollectorsBySubscription().catch(console.error);
