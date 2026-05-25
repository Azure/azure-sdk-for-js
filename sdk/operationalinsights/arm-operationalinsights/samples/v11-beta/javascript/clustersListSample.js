// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the Log Analytics clusters in a subscription.
 *
 * @summary gets the Log Analytics clusters in a subscription.
 * x-ms-original-file: 2025-07-01/ClustersSubscriptionList.json
 */
async function clustersSubscriptionList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "53bc36c5-91e1-4d09-92c9-63b89e571926";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await clustersSubscriptionList();
}

main().catch(console.error);
