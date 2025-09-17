// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the current linked storage settings for an Application Insights component.
 *
 * @summary Returns the current linked storage settings for an Application Insights component.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/preview/2020-03-01-preview/examples/ComponentLinkedStorageAccountsGet.json
 */

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function componentLinkedStorageAccountsGet(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] ||
    "86dc51d3-92ed-4d7e-947a-775ea79b4918";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] ||
    "someResourceGroupName";
  const resourceName = "myComponent";
  const storageType = "ServiceProfiler";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.componentLinkedStorageAccountsOperations.get(
    resourceGroupName,
    resourceName,
    storageType,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await componentLinkedStorageAccountsGet();
}

main().catch(console.error);
