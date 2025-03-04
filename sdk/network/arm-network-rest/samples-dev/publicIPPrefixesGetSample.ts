// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PublicIPPrefixesGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified public IP prefix in a specified resource group.
 *
 * @summary Gets the specified public IP prefix in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PublicIpPrefixGet.json
 */
async function getPublicIPPrefix(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const publicIpPrefixName = "test-ipprefix";
  const options: PublicIPPrefixesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIpPrefixName}",
      subscriptionId,
      resourceGroupName,
      publicIpPrefixName,
    )
    .get(options);
  console.log(result);
}

getPublicIPPrefix().catch(console.error);
