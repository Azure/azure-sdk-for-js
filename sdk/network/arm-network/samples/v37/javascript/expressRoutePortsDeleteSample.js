// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified ExpressRoutePort resource.
 *
 * @summary deletes the specified ExpressRoutePort resource.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortDelete.json
 */
async function expressRoutePortDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.expressRoutePorts.delete("rg1", "portName");
}

async function main() {
  await expressRoutePortDelete();
}

main().catch(console.error);
