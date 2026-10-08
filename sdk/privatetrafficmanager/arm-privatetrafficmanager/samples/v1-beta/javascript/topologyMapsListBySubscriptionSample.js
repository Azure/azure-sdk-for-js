// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateTrafficManagerManagementClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Topology Maps within a subscription.
 *
 * @summary lists all Topology Maps within a subscription.
 * x-ms-original-file: 2026-02-09-preview/TopologyMaps_ListBySubscription_MaximumSet_Gen.json
 */
async function topologyMapsListBySubscriptionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.topologyMaps.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await topologyMapsListBySubscriptionMaximumSet();
}

main().catch(console.error);
