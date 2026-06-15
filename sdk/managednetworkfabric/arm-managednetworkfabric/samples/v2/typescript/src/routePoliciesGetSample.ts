// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements Route Policy GET method.
 *
 * @summary implements Route Policy GET method.
 * x-ms-original-file: 2025-07-15/RoutePolicies_Get.json
 */
async function routePoliciesGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.routePolicies.get("example-rg", "example-routePolicy");
  console.log(result);
}

async function main(): Promise<void> {
  await routePoliciesGetMaximumSetGen();
}

main().catch(console.error);
