// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the Continuous Export configuration for this export id.
 *
 * @summary update the Continuous Export configuration for this export id.
 * x-ms-original-file: 2015-05-01/ExportConfigurationUpdate.json
 */
async function exportConfigurationUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.exportConfigurations.update(
    "my-resource-group",
    "my-component",
    "uGOoki0jQsyEs3IdQ83Q4QsNr4=",
    {
      destinationAccountId:
        "/subscriptions/subid/resourceGroups/my-resource-group/providers/Microsoft.ClassicStorage/storageAccounts/mystorageblob",
      destinationAddress:
        "https://mystorageblob.blob.core.windows.net/fchentest?sv=2015-04-05&sr=c&sig=token",
      destinationStorageLocationId: "eastus",
      destinationStorageSubscriptionId: "subid",
      destinationType: "Blob",
      isEnabled: "true",
      notificationQueueEnabled: "false",
      notificationQueueUri: "",
      recordTypes:
        "Requests, Event, Exceptions, Metrics, PageViews, PageViewPerformance, Rdd, PerformanceCounters, Availability",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await exportConfigurationUpdate();
}

main().catch(console.error);
