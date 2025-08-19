// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Recommendation action session operation status.
 *
 * @summary Recommendation action session operation status.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2018-06-01/examples/RecommendedActionSessionOperationStatus.json
 */

import { MySQLManagementClient } from "@azure/arm-mysql";
import { DefaultAzureCredential } from "@azure/identity";

async function recommendedActionSessionOperationStatus(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const locationName = "WestUS";
  const operationId = "aaaabbbb-cccc-dddd-0000-111122223333";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementClient(credential, subscriptionId);
  const result = await client.locationBasedRecommendedActionSessionsOperationStatus.get(
    locationName,
    operationId,
  );
  console.log(result);
}

recommendedActionSessionOperationStatus().catch(console.error);
