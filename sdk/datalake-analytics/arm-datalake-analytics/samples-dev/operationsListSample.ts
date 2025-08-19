// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataLakeAnalyticsAccountManagementClient } from "@azure/arm-datalake-analytics";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Lists all of the available Data Lake Analytics REST API operations.
 *
 * @summary Lists all of the available Data Lake Analytics REST API operations.
 * x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/Operations_List.json
 */
async function listsAllOfTheAvailableDataLakeAnalyticsRestApiOperations(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new DataLakeAnalyticsAccountManagementClient(credential, subscriptionId);
  const result = await client.operations.list();
  console.log(result);
}

listsAllOfTheAvailableDataLakeAnalyticsRestApiOperations().catch(console.error);
