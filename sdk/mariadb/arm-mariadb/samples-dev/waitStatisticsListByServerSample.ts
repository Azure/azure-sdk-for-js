// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WaitStatisticsInput } from "@azure/arm-mariadb";
import { MariaDBManagementClient } from "@azure/arm-mariadb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Retrieve wait statistics for specified aggregation window.
 *
 * @summary Retrieve wait statistics for specified aggregation window.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/WaitStatisticsListByServer.json
 */
async function waitStatisticsListByServer(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "testResourceGroupName";
  const serverName = "testServerName";
  const parameters: WaitStatisticsInput = {
    aggregationWindow: "PT15M",
    observationEndTime: new Date("2019-05-07T20:00:00.000Z"),
    observationStartTime: new Date("2019-05-01T20:00:00.000Z"),
  };
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.waitStatistics.listByServer(
    resourceGroupName,
    serverName,
    parameters,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

waitStatisticsListByServer().catch(console.error);
