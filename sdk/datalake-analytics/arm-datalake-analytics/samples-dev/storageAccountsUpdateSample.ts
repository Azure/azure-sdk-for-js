// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the Data Lake Analytics account to replace Azure Storage blob account details, such as the access key and/or suffix.
 *
 * @summary Updates the Data Lake Analytics account to replace Azure Storage blob account details, such as the access key and/or suffix.
 * x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/StorageAccounts_Update.json
 */

import type {
  UpdateStorageAccountParameters,
  StorageAccountsUpdateOptionalParams,
} from "@azure/arm-datalake-analytics";
import { DataLakeAnalyticsAccountManagementClient } from "@azure/arm-datalake-analytics";
import { DefaultAzureCredential } from "@azure/identity";

async function replacesAzureStorageBlobAccountDetails(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "contosorg";
  const accountName = "contosoadla";
  const storageAccountName = "test_storage";
  const parameters: UpdateStorageAccountParameters = {
    accessKey: "34adfa4f-cedf-4dc0-ba29-b6d1a69ab346",
    suffix: "test_suffix",
  };
  const options: StorageAccountsUpdateOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new DataLakeAnalyticsAccountManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.update(
    resourceGroupName,
    accountName,
    storageAccountName,
    options,
  );
  console.log(result);
}

replacesAzureStorageBlobAccountDetails().catch(console.error);
