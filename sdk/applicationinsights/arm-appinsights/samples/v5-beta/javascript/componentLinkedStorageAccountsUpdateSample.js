// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update linked storage accounts for an Application Insights component.
 *
 * @summary update linked storage accounts for an Application Insights component.
 * x-ms-original-file: 2020-03-01-preview/ComponentLinkedStorageAccountsUpdate.json
 */
async function componentLinkedStorageAccountsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4918";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.componentLinkedStorageAccounts.update(
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
  await componentLinkedStorageAccountsUpdate();
}

main().catch(console.error);
