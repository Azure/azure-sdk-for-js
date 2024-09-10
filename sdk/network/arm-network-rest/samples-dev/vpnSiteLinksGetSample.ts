// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, { VpnSiteLinksGetParameters } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Retrieves the details of a VPN site link.
 *
 * @summary Retrieves the details of a VPN site link.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VpnSiteLinkGet.json
 */
async function vpnSiteGet() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const vpnSiteName = "vpnSite1";
  const vpnSiteLinkName = "vpnSiteLink1";
  const options: VpnSiteLinksGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnSites/{vpnSiteName}/vpnSiteLinks/{vpnSiteLinkName}",
      subscriptionId,
      resourceGroupName,
      vpnSiteName,
      vpnSiteLinkName,
    )
    .get(options);
  console.log(result);
}

vpnSiteGet().catch(console.error);
