// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete linked storage accounts for an Application Insights component.
 *
 * @summary delete linked storage accounts for an Application Insights component.
 * x-ms-original-file: 2020-03-01-preview/ComponentLinkedStorageAccountsDelete.json
 */
async function componentLinkedStorageAccountsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4918";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  await client.componentLinkedStorageAccounts.delete(
    "someResourceGroupName",
    "myComponent",
    "ServiceProfiler",
  );
}

async function main(): Promise<void> {
  await componentLinkedStorageAccountsDelete();
}

main().catch(console.error);
