// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates the specified Network Virtual Appliance.
 *
 * @summary Creates or updates the specified Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkVirtualAppliancePut.json
 */

import type { NetworkVirtualAppliancesCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createNetworkVirtualAppliance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkVirtualApplianceName = "nva";
  const options: NetworkVirtualAppliancesCreateOrUpdateParameters = {
    body: {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/subid/resourcegroups/rg1/providers/MicrosoftManagedIdentity/userAssignedIdentities/identity1":
            {},
        },
      },
      location: "West US",
      properties: {
        bootStrapConfigurationBlobs: [
          "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrbootstrapconfig",
        ],
        cloudInitConfigurationBlobs: [
          "https://csrncvhdstorage1.blob.core.windows.net/csrncvhdstoragecont/csrcloudinitconfig",
        ],
        nvaSku: {
          bundledScaleUnit: "1",
          marketPlaceVersion: "12.1",
          vendor: "Cisco SDWAN",
        },
        virtualApplianceAsn: 10000,
        virtualHub: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1",
        },
      },
      tags: { key1: "value1" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}",
      subscriptionId,
      resourceGroupName,
      networkVirtualApplianceName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createNetworkVirtualAppliance().catch(console.error);
