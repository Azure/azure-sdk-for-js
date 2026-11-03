// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureTrafficCollectorClient } from "@azure/arm-networkfunction";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return list of Azure Traffic Collectors in a subscription
 *
 * @summary return list of Azure Traffic Collectors in a subscription
 * x-ms-original-file: 2022-11-01/AzureTrafficCollectorsBySubscriptionList.json
 */
async function listOfTrafficCollectorsBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureTrafficCollectorsBySubscription.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listOfTrafficCollectorsBySubscription();
}

main().catch(console.error);
