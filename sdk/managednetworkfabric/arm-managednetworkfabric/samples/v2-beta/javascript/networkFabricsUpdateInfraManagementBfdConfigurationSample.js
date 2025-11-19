// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the Infra Management BFD Configuration of the underlying resources in the given Network Fabric instance.
 *
 * @summary updates the Infra Management BFD Configuration of the underlying resources in the given Network Fabric instance.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabrics_UpdateInfraManagementBfdConfiguration.json
 */
async function networkFabricsUpdateInfraManagementBfdConfigurationMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkFabrics.updateInfraManagementBfdConfiguration(
    "example-rg",
    "example-fabric",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main() {
  await networkFabricsUpdateInfraManagementBfdConfigurationMaximumSetGen();
}

main().catch(console.error);
