// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the specified ExpressRouteLag resource.
 *
 * @summary creates or updates the specified ExpressRouteLag resource.
 * x-ms-original-file: 2025-09-01/ExpressRouteLagCreate.json
 */
async function createExpressRouteLag() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteLags.createOrUpdate("rg1", "lagName", {
    location: "eastus2euap",
    properties: {
      peeringLocation: "peeringLocationName",
      bandwidthInGbps: 100,
      encapsulation: "Dot1Q",
      billingType: "MeteredData",
      numberOfPorts: 4,
      minimumActivePortsRequired: 4,
      lacpTimer: "Fast",
    },
  });
  console.log(result);
}

async function main() {
  await createExpressRouteLag();
}

main().catch(console.error);
