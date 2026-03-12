// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Replace current linked storage account for an Application Insights component.
 *
 * @summary Replace current linked storage account for an Application Insights component.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/preview/2020-03-01-preview/examples/ComponentLinkedStorageAccountsCreateAndUpdate.json
 */

import {
  ComponentLinkedStorageAccounts,
  ApplicationInsightsManagementClient,
} from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function componentLinkedStorageAccountsCreateAndUpdate(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] ||
    "86dc51d3-92ed-4d7e-947a-775ea79b4918";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] ||
    "someResourceGroupName";
  const resourceName = "myComponent";
  const storageType = "ServiceProfiler";
  const linkedStorageAccountsProperties: ComponentLinkedStorageAccounts = {
    linkedStorageAccount:
      "/subscriptions/86dc51d3-92ed-4d7e-947a-775ea79b4918/resourceGroups/someResourceGroupName/providers/Microsoft.Storage/storageAccounts/storageaccountname",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result =
    await client.componentLinkedStorageAccountsOperations.createAndUpdate(
      resourceGroupName,
      resourceName,
      storageType,
      linkedStorageAccountsProperties,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await componentLinkedStorageAccountsCreateAndUpdate();
}

main().catch(console.error);
