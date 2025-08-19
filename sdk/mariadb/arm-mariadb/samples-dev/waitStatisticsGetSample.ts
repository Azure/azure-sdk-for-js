// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieve wait statistics for specified identifier.
 *
 * @summary Retrieve wait statistics for specified identifier.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/WaitStatisticsGet.json
 */

import { MariaDBManagementClient } from "@azure/arm-mariadb";
import { DefaultAzureCredential } from "@azure/identity";

async function waitStatisticsGet(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "testResourceGroupName";
  const serverName = "testServerName";
  const waitStatisticsId =
    "636927606000000000-636927615000000000-send-wait/io/socket/sql/client_connection-2--0";
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const result = await client.waitStatistics.get(resourceGroupName, serverName, waitStatisticsId);
  console.log(result);
}

waitStatisticsGet().catch(console.error);
