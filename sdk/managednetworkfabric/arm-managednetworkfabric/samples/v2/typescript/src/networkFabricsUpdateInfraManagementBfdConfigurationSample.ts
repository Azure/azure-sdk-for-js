// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the Infra Management BFD Configuration of the underlying resources in the given Network Fabric instance.
 *
 * @summary updates the Infra Management BFD Configuration of the underlying resources in the given Network Fabric instance.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_UpdateInfraManagementBfdConfiguration.json
 */
async function networkFabricsUpdateInfraManagementBfdConfigurationMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.updateInfraManagementBfdConfiguration(
    "example-rg",
    "example-fabric",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricsUpdateInfraManagementBfdConfigurationMaximumSetGen();
}

main().catch(console.error);
