// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update Static Route BFD administrative state for internalNetwork.
 *
 * @summary update Static Route BFD administrative state for internalNetwork.
 * x-ms-original-file: 2025-07-15/InternalNetworks_UpdateStaticRouteBfdAdministrativeState.json
 */
async function internalNetworksUpdateStaticRouteBfdAdministrativeState() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.internalNetworks.updateStaticRouteBfdAdministrativeState(
    "example-rg",
    "example-l3domain",
    "example-internalNetwork",
    { state: "Enable", resourceIds: [""] },
  );
  console.log(result);
}

async function main() {
  await internalNetworksUpdateStaticRouteBfdAdministrativeState();
}

main().catch(console.error);
