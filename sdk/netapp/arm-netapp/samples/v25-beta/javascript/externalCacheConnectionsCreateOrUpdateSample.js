// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the specified External Cache Connection
 *
 * @summary create or update the specified External Cache Connection
 * x-ms-original-file: 2026-08-15-preview/ExternalCacheConnections_CreateOrUpdate.json
 */
async function externalCacheConnectionsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.externalCacheConnections.createOrUpdate(
    "contosoNetAppRg",
    "contosoCacheConnection",
    {
      location: "eastus",
      properties: {
        originVolumeResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contosoNetAppRg/providers/Microsoft.NetApp/netAppAccounts/contosoAccount/capacityPools/contosoPool/volumes/contosoVolume",
        externalCacheName: "contosoCache",
        externalSvmResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contosoNetAppRg/providers/Microsoft.NetApp/externalClusters/contosoExternalCluster/externalSvms/contosoExternalSvm",
        clusterPeerSubnetResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contosoNetAppRg/providers/Microsoft.Network/virtualNetworks/contosoVnet/subnets/contosoSubnet",
      },
    },
  );
  console.log(result);
}

async function main() {
  await externalCacheConnectionsCreateOrUpdate();
}

main().catch(console.error);
