// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the Workload Management BFD Configuration of the underlying resources in the given Network Fabric instance.
 *
 * @summary updates the Workload Management BFD Configuration of the underlying resources in the given Network Fabric instance.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_UpdateWorkloadManagementBfdConfiguration.json
 */
async function networkFabricsUpdateWorkloadManagementBfdConfigurationMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.updateWorkloadManagementBfdConfiguration(
    "example-rg",
    "example-fabric",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricsUpdateWorkloadManagementBfdConfigurationMaximumSetGen();
}

main().catch(console.error);
