// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enables racks for this Isolation Domain.
 *
 * @summary enables racks for this Isolation Domain.
 * x-ms-original-file: 2024-06-15-preview/L3IsolationDomains_UpdateAdministrativeState.json
 */
async function l3IsolationDomainsUpdateAdministrativeStateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.l3IsolationDomains.updateAdministrativeState(
    "example-rg",
    "example-l3domain",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main() {
  await l3IsolationDomainsUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
