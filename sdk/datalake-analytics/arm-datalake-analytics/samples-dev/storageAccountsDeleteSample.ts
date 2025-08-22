// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the specified Data Lake Analytics account to remove an Azure Storage account.
 *
 * @summary Updates the specified Data Lake Analytics account to remove an Azure Storage account.
 * x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/StorageAccounts_Delete.json
 */

import { DataLakeAnalyticsAccountManagementClient } from "@azure/arm-datalake-analytics";
import { DefaultAzureCredential } from "@azure/identity";

async function removesAnAzureStorageAccount(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "contosorg";
  const accountName = "contosoadla";
  const storageAccountName = "test_storage";
  const credential = new DefaultAzureCredential();
  const client = new DataLakeAnalyticsAccountManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.delete(
    resourceGroupName,
    accountName,
    storageAccountName,
  );
  console.log(result);
}

removesAnAzureStorageAccount().catch(console.error);
