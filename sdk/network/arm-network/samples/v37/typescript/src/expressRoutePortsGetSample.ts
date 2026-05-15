// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the requested ExpressRoutePort resource.
 *
 * @summary retrieves the requested ExpressRoutePort resource.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortGet.json
 */
async function expressRoutePortGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRoutePorts.get("rg1", "portName");
  console.log(result);
}

async function main(): Promise<void> {
  await expressRoutePortGet();
}

main().catch(console.error);
