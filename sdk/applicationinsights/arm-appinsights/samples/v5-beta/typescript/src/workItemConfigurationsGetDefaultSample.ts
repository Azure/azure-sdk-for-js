// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets default work item configurations that exist for the application
 *
 * @summary gets default work item configurations that exist for the application
 * x-ms-original-file: 2015-05-01/WorkItemConfigDefaultGet.json
 */
async function workItemConfigurationsGetDefault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.workItemConfigurations.getDefault(
    "my-resource-group",
    "my-component",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workItemConfigurationsGetDefault();
}

main().catch(console.error);
