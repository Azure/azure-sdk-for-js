// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to replace current linked storage account for an Application Insights component.
 *
 * @summary replace current linked storage account for an Application Insights component.
 * x-ms-original-file: 2020-03-01-preview/ComponentLinkedStorageAccountsCreateAndUpdate.json
 */
async function componentLinkedStorageAccountsCreateAndUpdate() {
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

async function main() {
  await componentLinkedStorageAccountsCreateAndUpdate();
}

main().catch(console.error);
