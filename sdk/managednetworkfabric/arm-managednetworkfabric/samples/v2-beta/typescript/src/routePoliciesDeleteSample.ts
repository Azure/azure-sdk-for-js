// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements Route Policy DELETE method.
 *
 * @summary implements Route Policy DELETE method.
 * x-ms-original-file: 2024-06-15-preview/RoutePolicies_Delete.json
 */
async function routePoliciesDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.routePolicies.delete("example-rg", "example-routePolicy");
}

async function main(): Promise<void> {
  await routePoliciesDeleteMaximumSetGen();
}

main().catch(console.error);
