// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to API to update certain properties of the Internet Gateway Rule resource.
 *
 * @summary API to update certain properties of the Internet Gateway Rule resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/InternetGatewayRules_Update_MaximumSet_Gen.json
 */

import type { InternetGatewayRulePatch } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function internetGatewayRulesUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const internetGatewayRuleName = "example-internetGatewayRule";
  const body: InternetGatewayRulePatch = { tags: { key3311: "1234" } };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.internetGatewayRules.beginUpdateAndWait(
    resourceGroupName,
    internetGatewayRuleName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await internetGatewayRulesUpdateMaximumSetGen();
}

main().catch(console.error);
