// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureTrafficCollectorClient } = require("@azure/arm-networkfunction");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to return list of Azure Traffic Collectors in a subscription
 *
 * @summary return list of Azure Traffic Collectors in a subscription
 * x-ms-original-file: 2022-11-01/AzureTrafficCollectorsBySubscriptionList.json
 */
async function listOfTrafficCollectorsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureTrafficCollectorsBySubscription.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOfTrafficCollectorsBySubscription();
}

main().catch(console.error);
