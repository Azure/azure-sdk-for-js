// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { VirtualHubsGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves the details of a VirtualHub.
 *
 * @summary Retrieves the details of a VirtualHub.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualHubGet.json
 */
async function virtualHubGet() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualHubName = "virtualHub1";
  const options: VirtualHubsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}",
      subscriptionId,
      resourceGroupName,
      virtualHubName,
    )
    .get(options);
  console.log(result);
}

virtualHubGet().catch(console.error);
