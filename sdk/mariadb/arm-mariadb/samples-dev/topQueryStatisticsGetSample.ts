// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieve the query statistic for specified identifier.
 *
 * @summary Retrieve the query statistic for specified identifier.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/TopQueryStatisticsGet.json
 */

import { MariaDBManagementClient } from "@azure/arm-mariadb";
import { DefaultAzureCredential } from "@azure/identity";

async function topQueryStatisticsGet(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "testResourceGroupName";
  const serverName = "testServerName";
  const queryStatisticId = "66-636923268000000000-636923277000000000-avg-duration";
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const result = await client.topQueryStatistics.get(
    resourceGroupName,
    serverName,
    queryStatisticId,
  );
  console.log(result);
}

topQueryStatisticsGet().catch(console.error);
