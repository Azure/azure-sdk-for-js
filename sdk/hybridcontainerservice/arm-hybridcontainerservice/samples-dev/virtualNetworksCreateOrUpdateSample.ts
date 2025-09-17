// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates the virtual network resource
 *
 * @summary Creates or updates the virtual network resource
 * x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/PutVirtualNetwork.json
 */

import type { VirtualNetwork } from "@azure/arm-hybridcontainerservice";
import { HybridContainerServiceClient } from "@azure/arm-hybridcontainerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function putVirtualNetwork(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDCONTAINERSERVICE_SUBSCRIPTION_ID"] || "a3e42606-29b1-4d7d-b1d9-9ff6b9d3c71b";
  const resourceGroupName =
    process.env["HYBRIDCONTAINERSERVICE_RESOURCE_GROUP"] || "test-arcappliance-resgrp";
  const virtualNetworkName = "test-vnet-static";
  const virtualNetworks: VirtualNetwork = {
    extendedLocation: {
      name: "/subscriptions/a3e42606-29b1-4d7d-b1d9-9ff6b9d3c71b/resourcegroups/test-arcappliance-resgrp/providers/microsoft.extendedlocation/customlocations/testcustomlocation",
      type: "CustomLocation",
    },
    location: "westus",
    properties: {
      dnsServers: ["192.168.0.1"],
      gateway: "192.168.0.1",
      infraVnetProfile: {
        hci: {
          mocGroup: "target-group",
          mocLocation: "MocLocation",
          mocVnetName: "vnet1",
        },
      },
      ipAddressPrefix: "192.168.0.0/16",
      vipPool: [{ endIP: "192.168.0.50", startIP: "192.168.0.10" }],
      vlanID: 10,
      vmipPool: [{ endIP: "192.168.0.130", startIP: "192.168.0.110" }],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridContainerServiceClient(credential, subscriptionId);
  const result = await client.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    virtualNetworks,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putVirtualNetwork();
}

main().catch(console.error);
