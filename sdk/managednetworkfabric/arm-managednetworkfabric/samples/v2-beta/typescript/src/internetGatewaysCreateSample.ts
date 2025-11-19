// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a Network Fabric Service Internet Gateway resource instance.
 *
 * @summary creates a Network Fabric Service Internet Gateway resource instance.
 * x-ms-original-file: 2024-06-15-preview/InternetGateways_Create.json
 */
async function internetGatewaysCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.internetGateways.create("example-rg", "example-internetGateway", {
    properties: {
      annotation: "annotation",
      internetGatewayRuleId:
        "/subscriptions/xxxx-xxxx-xxxx-xxxx/providers/Microsoft.ManagedNetworkFabric/internetGatewayRules/example-internetGatewayRule",
      type: "Infrastructure",
      internetGatewayType: "Infrastructure",
      networkFabricControllerId:
        "/subscriptions/xxxx-xxxx-xxxx-xxxx/resourcegroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabricControllers/example-networkFabricController",
    },
    tags: { keyId: "KeyValue" },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await internetGatewaysCreateMaximumSetGen();
}

main().catch(console.error);
