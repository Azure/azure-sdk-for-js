// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an express route circuit.
 *
 * @summary creates or updates an express route circuit.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitCreate.json
 */
async function createExpressRouteCircuit(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuits.createOrUpdate("rg1", "circuitName", {
    location: "Brazil South",
    allowClassicOperations: false,
    authorizations: [],
    peerings: [],
    serviceProviderProperties: {
      bandwidthInMbps: 200,
      peeringLocation: "Silicon Valley",
      serviceProviderName: "Equinix",
    },
    sku: { name: "Standard_MeteredData", family: "MeteredData", tier: "Standard" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an express route circuit.
 *
 * @summary creates or updates an express route circuit.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitCreateOnExpressRoutePort.json
 */
async function createExpressRouteCircuitOnExpressRoutePort(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuits.createOrUpdate("rg1", "expressRouteCircuit1", {
    location: "westus",
    authorizationKey: "b0be57f5-1fba-463b-adec-ffe767354cdd",
    bandwidthInGbps: 10,
    enableDirectPortRateLimit: false,
    expressRoutePort: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/expressRoutePorts/portName",
    },
    sku: { name: "Premium_MeteredData", family: "MeteredData", tier: "Premium" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createExpressRouteCircuit();
  await createExpressRouteCircuitOnExpressRoutePort();
}

main().catch(console.error);
