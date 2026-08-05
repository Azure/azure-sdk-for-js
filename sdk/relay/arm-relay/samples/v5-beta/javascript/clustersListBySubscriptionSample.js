// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists Relay clusters in a subscription.
 *
 * @summary lists Relay clusters in a subscription.
 * x-ms-original-file: 2026-07-01-preview/Clusters/ClustersListBySubscription.json
 */
async function clustersListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new RelayAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await clustersListBySubscription();
}

main().catch(console.error);
