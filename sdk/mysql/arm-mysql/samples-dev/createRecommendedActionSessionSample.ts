// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create recommendation action session for the advisor.
 *
 * @summary Create recommendation action session for the advisor.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2018-06-01/examples/RecommendedActionSessionCreate.json
 */

import { MySQLManagementClient } from "@azure/arm-mysql";
import { DefaultAzureCredential } from "@azure/identity";

async function recommendedActionSessionCreate(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "testResourceGroupName";
  const serverName = "testServerName";
  const advisorName = "Index";
  const databaseName = "someDatabaseName";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementClient(credential, subscriptionId);
  const result = await client.beginCreateRecommendedActionSessionAndWait(
    resourceGroupName,
    serverName,
    advisorName,
    databaseName,
  );
  console.log(result);
}

recommendedActionSessionCreate().catch(console.error);
