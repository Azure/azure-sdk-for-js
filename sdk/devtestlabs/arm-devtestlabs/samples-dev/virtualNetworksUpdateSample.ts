// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VirtualNetworkFragment } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Allows modifying tags of virtual networks. All other properties will be ignored.
 *
 * @summary Allows modifying tags of virtual networks. All other properties will be ignored.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/VirtualNetworks_Update.json
 */
async function virtualNetworksUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{virtualNetworkName}";
  const virtualNetwork: VirtualNetworkFragment = {
    tags: { tagName1: "tagValue1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.virtualNetworks.update(
    resourceGroupName,
    labName,
    name,
    virtualNetwork,
  );
  console.log(result);
}

virtualNetworksUpdate().catch(console.error);
