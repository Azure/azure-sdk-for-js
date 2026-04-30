// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves the specified ExpressRouteLink resource.
 *
 * @summary Retrieves the specified ExpressRouteLink resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteLinkGet.json
 */
async function expressRouteLinkGet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const expressRoutePortName = "portName";
  const linkName = "linkName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteLinks.get(
    resourceGroupName,
    expressRoutePortName,
    linkName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await expressRouteLinkGet();
}

main().catch(console.error);
