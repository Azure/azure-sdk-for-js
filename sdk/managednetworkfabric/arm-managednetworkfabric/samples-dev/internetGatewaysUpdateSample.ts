// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { InternetGatewayPatch } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Execute patch on Network Fabric Service Internet Gateway.
 *
 * @summary Execute patch on Network Fabric Service Internet Gateway.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/InternetGateways_Update_MaximumSet_Gen.json
 */
async function internetGatewaysUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const internetGatewayName = "example-internetGateway";
  const body: InternetGatewayPatch = {
    internetGatewayRuleId:
      "/subscriptions/xxxx-xxxx-xxxx-xxxx/providers/Microsoft.ManagedNetworkFabric/internetGatewayRules/example-internetGatewayRule",
    tags: { key81: "2345" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.internetGateways.beginUpdateAndWait(
    resourceGroupName,
    internetGatewayName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await internetGatewaysUpdateMaximumSetGen();
}

main().catch(console.error);
