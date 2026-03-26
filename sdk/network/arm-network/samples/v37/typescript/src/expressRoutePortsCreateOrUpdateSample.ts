// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the specified ExpressRoutePort resource.
 *
 * @summary creates or updates the specified ExpressRoutePort resource.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortCreate.json
 */
async function expressRoutePortCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRoutePorts.createOrUpdate("rg1", "portName", {
    location: "westus",
    bandwidthInGbps: 100,
    billingType: "UnlimitedData",
    encapsulation: "QinQ",
    peeringLocation: "peeringLocationName",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the specified ExpressRoutePort resource.
 *
 * @summary creates or updates the specified ExpressRoutePort resource.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortUpdateLink.json
 */
async function expressRoutePortUpdateLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRoutePorts.createOrUpdate("rg1", "portName", {
    location: "westus",
    bandwidthInGbps: 100,
    billingType: "UnlimitedData",
    encapsulation: "QinQ",
    links: [{ name: "link1", adminState: "Enabled" }],
    peeringLocation: "peeringLocationName",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await expressRoutePortCreate();
  await expressRoutePortUpdateLink();
}

main().catch(console.error);
