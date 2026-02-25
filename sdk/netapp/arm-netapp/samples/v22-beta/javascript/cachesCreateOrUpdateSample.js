// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the specified Cache within the Capacity Pool
 *
 * @summary create or update the specified Cache within the Capacity Pool
 * x-ms-original-file: 2025-09-01-preview/Caches_CreateOrUpdate.json
 */
async function cachesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.caches.createOrUpdate("myRG", "account1", "pool1", "cache1", {
    location: "eastus",
    properties: {
      filepath: "cache-west-us2-01",
      size: 107374182400,
      ldap: "Enabled",
      ldapServerType: "OpenLDAP",
      cacheSubnetResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRP/providers/Microsoft.Network/virtualNetworks/cacheVnet/subnets/cacheSubnet1",
      peeringSubnetResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRP/providers/Microsoft.Network/virtualNetworks/icLifVnet/subnets/peeringSubnet1",
      encryptionKeySource: "Microsoft.NetApp",
      originClusterInformation: {
        peerClusterName: "cluster1",
        peerAddresses: ["192.0.2.10", "192.0.2.11"],
        peerVserverName: "vserver1",
        peerVolumeName: "originvol1",
      },
    },
  });
  console.log(result);
}

async function main() {
  await cachesCreateOrUpdate();
}

main().catch(console.error);
