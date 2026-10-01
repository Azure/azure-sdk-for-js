// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all devcenters in a subscription.
 *
 * @summary lists all devcenters in a subscription.
 * x-ms-original-file: 2026-01-01-preview/DevCenters_ListBySubscription.json
 */
async function devCentersListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.devCenters.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await devCentersListBySubscription();
}

main().catch(console.error);
