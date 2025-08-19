// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Patches the virtual network resource
 *
 * @summary Patches the virtual network resource
 * x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/UpdateVirtualNetwork.json
 */

import type { VirtualNetworksPatch } from "@azure/arm-hybridcontainerservice";
import { HybridContainerServiceClient } from "@azure/arm-hybridcontainerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateVirtualNetwork(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDCONTAINERSERVICE_SUBSCRIPTION_ID"] || "a3e42606-29b1-4d7d-b1d9-9ff6b9d3c71b";
  const resourceGroupName =
    process.env["HYBRIDCONTAINERSERVICE_RESOURCE_GROUP"] || "test-arcappliance-resgrp";
  const virtualNetworkName = "test-vnet-static";
  const virtualNetworks: VirtualNetworksPatch = {
    tags: { additionalProperties: "sample" },
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridContainerServiceClient(credential, subscriptionId);
  const result = await client.virtualNetworks.beginUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    virtualNetworks,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateVirtualNetwork();
}

main().catch(console.error);
