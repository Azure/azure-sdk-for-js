// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a private dns zone group in the specified private endpoint.
 *
 * @summary Creates or updates a private dns zone group in the specified private endpoint.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateEndpointDnsZoneGroupCreate.json
 */

import type { PrivateDnsZoneGroupsCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createPrivateDnsZoneGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const privateEndpointName = "testPe";
  const privateDnsZoneGroupName = "testPdnsgroup";
  const options: PrivateDnsZoneGroupsCreateOrUpdateParameters = {
    body: {
      properties: {
        privateDnsZoneConfigs: [
          {
            properties: {
              privateDnsZoneId:
                "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/privateDnsZones/zone1.com",
            },
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateEndpoints/{privateEndpointName}/privateDnsZoneGroups/{privateDnsZoneGroupName}",
      subscriptionId,
      resourceGroupName,
      privateEndpointName,
      privateDnsZoneGroupName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createPrivateDnsZoneGroup().catch(console.error);
