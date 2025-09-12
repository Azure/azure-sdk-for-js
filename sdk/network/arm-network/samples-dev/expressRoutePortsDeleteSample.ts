// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified ExpressRoutePort resource.
 *
 * @summary Deletes the specified ExpressRoutePort resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/ExpressRoutePortDelete.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function expressRoutePortDelete(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const expressRoutePortName = "portName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRoutePorts.beginDeleteAndWait(
    resourceGroupName,
    expressRoutePortName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await expressRoutePortDelete();
}

main().catch(console.error);
