// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified ExpressRoutePort resource.
 *
 * @summary deletes the specified ExpressRoutePort resource.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortDelete.json
 */
async function expressRoutePortDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.expressRoutePorts.delete("rg1", "portName");
}

async function main(): Promise<void> {
  await expressRoutePortDelete();
}

main().catch(console.error);
