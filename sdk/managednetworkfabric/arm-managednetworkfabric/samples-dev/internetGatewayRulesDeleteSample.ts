// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Implements Internet Gateway Rules DELETE method.
 *
 * @summary Implements Internet Gateway Rules DELETE method.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/InternetGatewayRules_Delete_MaximumSet_Gen.json
 */

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function internetGatewayRulesDeleteMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const internetGatewayRuleName = "example-internetGatewayRule";
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.internetGatewayRules.beginDeleteAndWait(
    resourceGroupName,
    internetGatewayRuleName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await internetGatewayRulesDeleteMaximumSetGen();
}

main().catch(console.error);
