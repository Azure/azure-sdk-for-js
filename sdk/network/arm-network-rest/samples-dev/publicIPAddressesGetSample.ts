// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PublicIPAddressesGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified public IP address in a specified resource group.
 *
 * @summary Gets the specified public IP address in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PublicIpAddressGet.json
 */
async function getPublicIPAddress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const publicIpAddressName = "testDNS-ip";
  const options: PublicIPAddressesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}",
      subscriptionId,
      resourceGroupName,
      publicIpAddressName,
    )
    .get(options);
  console.log(result);
}

getPublicIPAddress().catch(console.error);
