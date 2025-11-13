// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI to update certain properties of the Internet Gateway Rule resource.
 *
 * @summary aPI to update certain properties of the Internet Gateway Rule resource.
 * x-ms-original-file: 2024-06-15-preview/InternetGatewayRules_Update.json
 */
async function internetGatewayRulesUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.internetGatewayRules.update(
    "example-rg",
    "example-internetGatewayRule",
    { tags: { KeyID: "KeyValue1" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await internetGatewayRulesUpdateMaximumSetGen();
}

main().catch(console.error);
