// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieve recommended actions from the advisor.
 *
 * @summary Retrieve recommended actions from the advisor.
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/RecommendedActionsListByServer.json
 */

import { MariaDBManagementClient } from "@azure/arm-mariadb";
import { DefaultAzureCredential } from "@azure/identity";

async function recommendedActionsListByServer(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "testResourceGroupName";
  const serverName = "testServerName";
  const advisorName = "Index";
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recommendedActions.listByServer(
    resourceGroupName,
    serverName,
    advisorName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

recommendedActionsListByServer().catch(console.error);
