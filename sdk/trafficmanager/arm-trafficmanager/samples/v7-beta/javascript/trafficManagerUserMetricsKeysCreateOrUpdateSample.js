// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { TrafficManagerManagementClient } = require("@azure/arm-trafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a subscription-level key used for Real User Metrics collection.
 *
 * @summary create or update a subscription-level key used for Real User Metrics collection.
 * x-ms-original-file: 2024-04-01-preview/TrafficManagerUserMetricsKeys-PUT.json
 */
async function trafficManagerUserMetricsKeysPUT() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.trafficManagerUserMetricsKeys.createOrUpdate();
  console.log(result);
}

async function main() {
  await trafficManagerUserMetricsKeysPUT();
}

main().catch(console.error);
