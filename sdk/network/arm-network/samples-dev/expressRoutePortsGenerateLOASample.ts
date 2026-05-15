// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate a letter of authorization for the requested ExpressRoutePort resource.
 *
 * @summary generate a letter of authorization for the requested ExpressRoutePort resource.
 * x-ms-original-file: 2025-05-01/GenerateExpressRoutePortsLOA.json
 */
async function generateExpressRoutePortLOA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRoutePorts.generateLOA("rg1", "portName", {
    customerName: "customerName",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await generateExpressRoutePortLOA();
}

main().catch(console.error);
