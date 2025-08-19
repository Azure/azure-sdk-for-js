// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the virtual networks in the specified subscription
 *
 * @summary Lists the virtual networks in the specified subscription
 * x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/ListVirtualNetworkBySubscription.json
 */

import { HybridContainerServiceClient } from "@azure/arm-hybridcontainerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listVirtualNetworkBySubscription(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDCONTAINERSERVICE_SUBSCRIPTION_ID"] || "a3e42606-29b1-4d7d-b1d9-9ff6b9d3c71b";
  const credential = new DefaultAzureCredential();
  const client = new HybridContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworks.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listVirtualNetworkBySubscription();
}

main().catch(console.error);
