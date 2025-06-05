// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PrivateDnsZoneGroupsGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the private dns zone group resource by specified private dns zone group name.
 *
 * @summary Gets the private dns zone group resource by specified private dns zone group name.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateEndpointDnsZoneGroupGet.json
 */
async function getPrivateDnsZoneGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const privateEndpointName = "testPe";
  const privateDnsZoneGroupName = "testPdnsgroup";
  const options: PrivateDnsZoneGroupsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateEndpoints/{privateEndpointName}/privateDnsZoneGroups/{privateDnsZoneGroupName}",
      subscriptionId,
      resourceGroupName,
      privateEndpointName,
      privateDnsZoneGroupName,
    )
    .get(options);
  console.log(result);
}

getPrivateDnsZoneGroup().catch(console.error);
