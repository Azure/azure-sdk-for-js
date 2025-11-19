// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to execute patch on Network Fabric Service Internet Gateway.
 *
 * @summary execute patch on Network Fabric Service Internet Gateway.
 * x-ms-original-file: 2024-06-15-preview/InternetGateways_Update.json
 */
async function internetGatewaysUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.internetGateways.update("example-rg", "example-internetGateway", {
    tags: { keyId: "KeyValue" },
    properties: {
      internetGatewayRuleId:
        "/subscriptions/xxxx-xxxx-xxxx-xxxx/providers/Microsoft.ManagedNetworkFabric/internetGatewayRules/example-internetGatewayRule",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await internetGatewaysUpdateMaximumSetGen();
}

main().catch(console.error);
