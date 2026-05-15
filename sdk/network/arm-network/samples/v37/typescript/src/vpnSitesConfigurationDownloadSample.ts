// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gives the sas-url to download the configurations for vpn-sites in a resource group.
 *
 * @summary gives the sas-url to download the configurations for vpn-sites in a resource group.
 * x-ms-original-file: 2025-05-01/VpnSitesConfigurationDownload.json
 */
async function vpnSitesConfigurationDownload(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.vpnSitesConfiguration.download("rg1", "wan1", {
    outputBlobSasUrl:
      "https://blobcortextesturl.blob.core.windows.net/folderforconfig/vpnFile?sp=rw&se=2018-01-10T03%3A42%3A04Z&sv=2017-04-17&sig=WvXrT5bDmDFfgHs%2Brz%2BjAu123eRCNE9BO0eQYcPDT7pY%3D&sr=b",
    vpnSites: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/vpnSites/abc",
    ],
  });
}

async function main(): Promise<void> {
  await vpnSitesConfigurationDownload();
}

main().catch(console.error);
