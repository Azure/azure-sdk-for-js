// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VirtualNetwork } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Create or replace an existing virtual network. This operation can take a while to complete.
 *
 * @summary Create or replace an existing virtual network. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/VirtualNetworks_CreateOrUpdate.json
 */
async function virtualNetworksCreateOrUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{virtualNetworkName}";
  const virtualNetwork: VirtualNetwork = {
    location: "{location}",
    tags: { tagName1: "tagValue1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    labName,
    name,
    virtualNetwork,
  );
  console.log(result);
}

virtualNetworksCreateOrUpdate().catch(console.error);
