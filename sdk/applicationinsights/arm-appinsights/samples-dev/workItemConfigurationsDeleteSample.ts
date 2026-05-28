// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a work item configuration of an Application Insights component.
 *
 * @summary delete a work item configuration of an Application Insights component.
 * x-ms-original-file: 2015-05-01/WorkItemConfigDelete.json
 */
async function workItemConfigurationDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  await client.workItemConfigurations.delete(
    "my-resource-group",
    "my-component",
    "Visual Studio Team Services",
  );
}

async function main(): Promise<void> {
  await workItemConfigurationDelete();
}

main().catch(console.error);
