// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Continuous Export configuration of an Application Insights component.
 *
 * @summary create a Continuous Export configuration of an Application Insights component.
 * x-ms-original-file: 2015-05-01/ExportConfigurationsPost.json
 */
async function exportConfigurationPost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.exportConfigurations.create("my-resource-group", "my-component", {
    destinationAccountId:
      "/subscriptions/subid/resourceGroups/my-resource-group/providers/Microsoft.ClassicStorage/storageAccounts/mystorageblob",
    destinationAddress:
      "https://mystorageblob.blob.core.windows.net/testexport?sv=2015-04-05&sr=c&sig=token",
    destinationStorageLocationId: "eastus",
    destinationStorageSubscriptionId: "subid",
    destinationType: "Blob",
    isEnabled: "true",
    notificationQueueEnabled: "false",
    notificationQueueUri: "",
    recordTypes:
      "Requests, Event, Exceptions, Metrics, PageViews, PageViewPerformance, Rdd, PerformanceCounters, Availability",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await exportConfigurationPost();
}

main().catch(console.error);
