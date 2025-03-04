// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { VirtualApplianceSitesGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified Virtual Appliance Site.
 *
 * @summary Gets the specified Virtual Appliance Site.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkVirtualApplianceSiteGet.json
 */
async function getNetworkVirtualApplianceSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkVirtualApplianceName = "nva";
  const siteName = "site1";
  const options: VirtualApplianceSitesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/virtualApplianceSites/{siteName}",
      subscriptionId,
      resourceGroupName,
      networkVirtualApplianceName,
      siteName,
    )
    .get(options);
  console.log(result);
}

getNetworkVirtualApplianceSite().catch(console.error);
