// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PublicIPAddressesListCloudServicePublicIPAddressesParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { paginate } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets information about all public IP addresses on a cloud service level.
 *
 * @summary Gets information about all public IP addresses on a cloud service level.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/CloudServicePublicIpListAll.json
 */
async function listVmssPublicIP(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "cs-tester";
  const cloudServiceName = "cs1";
  const options: PublicIPAddressesListCloudServicePublicIPAddressesParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/publicipaddresses",
      subscriptionId,
      resourceGroupName,
      cloudServiceName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listVmssPublicIP().catch(console.error);
