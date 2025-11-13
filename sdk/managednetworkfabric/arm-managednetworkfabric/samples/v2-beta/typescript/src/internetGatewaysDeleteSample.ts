// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to execute a delete on Network Fabric Service Internet Gateway.
 *
 * @summary execute a delete on Network Fabric Service Internet Gateway.
 * x-ms-original-file: 2024-06-15-preview/InternetGateways_Delete.json
 */
async function internetGatewaysDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.internetGateways.delete("example-rg", "example-internetGateway");
}

async function main(): Promise<void> {
  await internetGatewaysDeleteMaximumSetGen();
}

main().catch(console.error);
