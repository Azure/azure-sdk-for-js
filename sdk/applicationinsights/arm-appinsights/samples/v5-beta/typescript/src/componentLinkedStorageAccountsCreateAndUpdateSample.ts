// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to replace current linked storage account for an Application Insights component.
 *
 * @summary replace current linked storage account for an Application Insights component.
 * x-ms-original-file: 2020-03-01-preview/ComponentLinkedStorageAccountsCreateAndUpdate.json
 */
async function componentLinkedStorageAccountsCreateAndUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4918";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.componentLinkedStorageAccounts.createAndUpdate(
    "someResourceGroupName",
    "myComponent",
    "ServiceProfiler",
    {
      linkedStorageAccount:
        "/subscriptions/86dc51d3-92ed-4d7e-947a-775ea79b4918/resourceGroups/someResourceGroupName/providers/Microsoft.Storage/storageAccounts/storageaccountname",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await componentLinkedStorageAccountsCreateAndUpdate();
}

main().catch(console.error);
