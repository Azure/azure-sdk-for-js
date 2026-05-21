// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the current linked storage settings for an Application Insights component.
 *
 * @summary returns the current linked storage settings for an Application Insights component.
 * x-ms-original-file: 2020-03-01-preview/ComponentLinkedStorageAccountsGet.json
 */
async function componentLinkedStorageAccountsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4918";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.componentLinkedStorageAccounts.get(
    "someResourceGroupName",
    "myComponent",
    "ServiceProfiler",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await componentLinkedStorageAccountsGet();
}

main().catch(console.error);
