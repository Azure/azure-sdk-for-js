// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements Route Policy GET method.
 *
 * @summary implements Route Policy GET method.
 * x-ms-original-file: 2024-06-15-preview/RoutePolicies_Get.json
 */
async function routePoliciesGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.routePolicies.get("example-rg", "example-routePolicy");
  console.log(result);
}

async function main() {
  await routePoliciesGetMaximumSetGen();
}

main().catch(console.error);
