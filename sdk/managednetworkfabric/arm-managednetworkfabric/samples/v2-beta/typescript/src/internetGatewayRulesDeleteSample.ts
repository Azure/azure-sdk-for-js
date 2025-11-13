// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements Internet Gateway Rules DELETE method.
 *
 * @summary implements Internet Gateway Rules DELETE method.
 * x-ms-original-file: 2024-06-15-preview/InternetGatewayRules_Delete.json
 */
async function internetGatewayRulesDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.internetGatewayRules.delete("example-rg", "example-internetGatewayRule");
}

async function main(): Promise<void> {
  await internetGatewayRulesDeleteMaximumSetGen();
}

main().catch(console.error);
