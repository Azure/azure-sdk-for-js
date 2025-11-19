// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updated the admin state for this Route Policy.
 *
 * @summary updated the admin state for this Route Policy.
 * x-ms-original-file: 2024-06-15-preview/RoutePolicies_UpdateAdministrativeState.json
 */
async function routePoliciesUpdateAdministrativeStateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.routePolicies.updateAdministrativeState(
    "example-rg",
    "example-routePolicy",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main() {
  await routePoliciesUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
