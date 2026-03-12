// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the SAS token associated with the specified Data Lake Analytics and Azure Storage account and container combination.
 *
 * @summary Gets the SAS token associated with the specified Data Lake Analytics and Azure Storage account and container combination.
 * x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/StorageAccounts_ListSasTokens.json
 */

import { DataLakeAnalyticsAccountManagementClient } from "@azure/arm-datalake-analytics";
import { DefaultAzureCredential } from "@azure/identity";

async function getsTheSasToken(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "contosorg";
  const accountName = "contosoadla";
  const storageAccountName = "test_storage";
  const containerName = "test_container";
  const credential = new DefaultAzureCredential();
  const client = new DataLakeAnalyticsAccountManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageAccounts.listSasTokens(
    resourceGroupName,
    accountName,
    storageAccountName,
    containerName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

getsTheSasToken().catch(console.error);
