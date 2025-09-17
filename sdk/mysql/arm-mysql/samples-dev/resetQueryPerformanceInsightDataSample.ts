// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Reset data for Query Performance Insight.
 *
 * @summary Reset data for Query Performance Insight.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2018-06-01/examples/QueryPerformanceInsightResetData.json
 */

import { MySQLManagementClient } from "@azure/arm-mysql";
import { DefaultAzureCredential } from "@azure/identity";

async function queryPerformanceInsightResetData(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "testResourceGroupName";
  const serverName = "testServerName";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementClient(credential, subscriptionId);
  const result = await client.resetQueryPerformanceInsightData(resourceGroupName, serverName);
  console.log(result);
}

queryPerformanceInsightResetData().catch(console.error);
