// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { InternetGateway } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a Network Fabric Service Internet Gateway resource instance.
 *
 * @summary Creates a Network Fabric Service Internet Gateway resource instance.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/InternetGateways_Create_MaximumSet_Gen.json
 */
async function internetGatewaysCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const internetGatewayName = "example-internetGateway";
  const body: InternetGateway = {
    typePropertiesType: "Infrastructure",
    annotation: "annotation",
    internetGatewayRuleId:
      "/subscriptions/xxxx-xxxx-xxxx-xxxx/providers/Microsoft.ManagedNetworkFabric/internetGatewayRules/example-internetGatewayRule",
    location: "eastus",
    networkFabricControllerId:
      "/subscriptions/xxxx-xxxx-xxxx-xxxx/resourcegroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabricControllers/example-networkFabricController",
    tags: { key3540: "1234" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.internetGateways.beginCreateAndWait(
    resourceGroupName,
    internetGatewayName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await internetGatewaysCreateMaximumSetGen();
}

main().catch(console.error);
