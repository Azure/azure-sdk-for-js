// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements Internet Gateway Rules DELETE method.
 *
 * @summary implements Internet Gateway Rules DELETE method.
 * x-ms-original-file: 2025-07-15/InternetGatewayRules_Delete.json
 */
async function internetGatewayRulesDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  await client.internetGatewayRules.delete("example-rg", "example-internetGatewayRule");
}

async function main(): Promise<void> {
  await internetGatewayRulesDeleteMaximumSetGen();
}

main().catch(console.error);
