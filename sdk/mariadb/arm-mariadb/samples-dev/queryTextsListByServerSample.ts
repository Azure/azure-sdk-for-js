// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieve the Query-Store query texts for specified queryIds.
 *
 * @summary Retrieve the Query-Store query texts for specified queryIds.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/QueryTextsListByServer.json
 */

import { MariaDBManagementClient } from "@azure/arm-mariadb";
import { DefaultAzureCredential } from "@azure/identity";

async function queryTextsListByServer(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "testResourceGroupName";
  const serverName = "testServerName";
  const queryIds = ["1", "2"];
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.queryTexts.listByServer(
    resourceGroupName,
    serverName,
    queryIds,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

queryTextsListByServer().catch(console.error);
