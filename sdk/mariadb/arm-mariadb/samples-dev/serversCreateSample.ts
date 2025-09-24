// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new server or updates an existing server. The update action will overwrite the existing server.
 *
 * @summary Creates a new server or updates an existing server. The update action will overwrite the existing server.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/ServerCreatePointInTimeRestore.json
 */

import type { ServerForCreate } from "@azure/arm-mariadb";
import { MariaDBManagementClient } from "@azure/arm-mariadb";
import { DefaultAzureCredential } from "@azure/identity";

async function createADatabaseAsAPointInTimeRestore(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TargetResourceGroup";
  const serverName = "targetserver";
  const parameters: ServerForCreate = {
    location: "brazilsouth",
    properties: {
      createMode: "PointInTimeRestore",
      restorePointInTime: new Date("2017-12-14T00:00:37.467Z"),
      sourceServerId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/SourceResourceGroup/providers/Microsoft.DBforMariaDB/servers/sourceserver",
    },
    sku: {
      name: "GP_Gen5_2",
      capacity: 2,
      family: "Gen5",
      tier: "GeneralPurpose",
    },
    tags: { elasticServer: "1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const result = await client.servers.beginCreateAndWait(resourceGroupName, serverName, parameters);
  console.log(result);
}

createADatabaseAsAPointInTimeRestore().catch(console.error);

/**
 * This sample demonstrates how to Creates a new server or updates an existing server. The update action will overwrite the existing server.
 *
 * @summary Creates a new server or updates an existing server. The update action will overwrite the existing server.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/ServerCreate.json
 */
async function createANewServer(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "testrg";
  const serverName = "mariadbtestsvc4";
  const parameters: ServerForCreate = {
    location: "westus",
    properties: {
      administratorLogin: "cloudsa",
      administratorLoginPassword: "<administratorLoginPassword>",
      createMode: "Default",
      minimalTlsVersion: "TLS1_2",
      sslEnforcement: "Enabled",
      storageProfile: {
        backupRetentionDays: 7,
        geoRedundantBackup: "Enabled",
        storageMB: 128000,
      },
    },
    sku: {
      name: "GP_Gen5_2",
      capacity: 2,
      family: "Gen5",
      tier: "GeneralPurpose",
    },
    tags: { elasticServer: "1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const result = await client.servers.beginCreateAndWait(resourceGroupName, serverName, parameters);
  console.log(result);
}

createANewServer().catch(console.error);

/**
 * This sample demonstrates how to Creates a new server or updates an existing server. The update action will overwrite the existing server.
 *
 * @summary Creates a new server or updates an existing server. The update action will overwrite the existing server.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/ServerCreateReplicaMode.json
 */
async function createAReplicaServer(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TargetResourceGroup";
  const serverName = "targetserver";
  const parameters: ServerForCreate = {
    location: "westus",
    properties: {
      createMode: "Replica",
      sourceServerId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/MasterResourceGroup/providers/Microsoft.DBforMariaDB/servers/masterserver",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const result = await client.servers.beginCreateAndWait(resourceGroupName, serverName, parameters);
  console.log(result);
}

createAReplicaServer().catch(console.error);

/**
 * This sample demonstrates how to Creates a new server or updates an existing server. The update action will overwrite the existing server.
 *
 * @summary Creates a new server or updates an existing server. The update action will overwrite the existing server.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/ServerCreateGeoRestoreMode.json
 */
async function createAServerAsAGeoRestore(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TargetResourceGroup";
  const serverName = "targetserver";
  const parameters: ServerForCreate = {
    location: "westus",
    properties: {
      createMode: "GeoRestore",
      sourceServerId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/SourceResourceGroup/providers/Microsoft.DBforMariaDB/servers/sourceserver",
    },
    sku: {
      name: "GP_Gen5_2",
      capacity: 2,
      family: "Gen5",
      tier: "GeneralPurpose",
    },
    tags: { elasticServer: "1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const result = await client.servers.beginCreateAndWait(resourceGroupName, serverName, parameters);
  console.log(result);
}

createAServerAsAGeoRestore().catch(console.error);
