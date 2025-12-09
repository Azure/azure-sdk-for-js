// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the specified NetApp Elastic Capacity Pool within the resource group and NetApp Elastic Account
 *
 * @summary create or update the specified NetApp Elastic Capacity Pool within the resource group and NetApp Elastic Account
 * x-ms-original-file: 2025-09-01-preview/ElasticCapacityPools_CreateOrUpdate.json
 */
async function elasticCapacityPoolsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticCapacityPools.createOrUpdate("myRG", "account1", "pool1", {
    location: "eastus",
    zones: ["1", "2", "3"],
    properties: {
      size: 4398046511104,
      serviceLevel: "ZoneRedundant",
      subnetResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRP/providers/Microsoft.Network/virtualNetworks/testvnet3/subnets/testsubnet3",
      activeDirectoryConfigResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/activeDirectoryConfigs/activeDirectoryConfig1",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the specified NetApp Elastic Capacity Pool within the resource group and NetApp Elastic Account
 *
 * @summary create or update the specified NetApp Elastic Capacity Pool within the resource group and NetApp Elastic Account
 * x-ms-original-file: 2025-09-01-preview/ElasticCapacityPools_CreateOrUpdateCMK.json
 */
async function elasticCapacityPoolsCreateOrUpdateCMK() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticCapacityPools.createOrUpdate("myRG", "account1", "pool1", {
    location: "eastus",
    zones: ["1", "2", "3"],
    properties: {
      size: 4398046511104,
      serviceLevel: "ZoneRedundant",
      subnetResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRP/providers/Microsoft.Network/virtualNetworks/testvnet3/subnets/testsubnet3",
      activeDirectoryConfigResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/activeDirectoryConfigs/activeDirectoryConfig1",
      encryption: {
        elasticPoolEncryptionKeySource: "NetApp",
        keyVaultPrivateEndpointResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/vaults/myKeyVault/privateEndpointConnections/myKeyVaultPec",
      },
    },
  });
  console.log(result);
}

async function main() {
  await elasticCapacityPoolsCreateOrUpdate();
  await elasticCapacityPoolsCreateOrUpdateCMK();
}

main().catch(console.error);
