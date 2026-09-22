// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list work item configurations that exist for the application
 *
 * @summary gets the list work item configurations that exist for the application
 * x-ms-original-file: 2015-05-01/WorkItemConfigsGet.json
 */
async function workItemConfigurationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workItemConfigurations.list(
    "my-resource-group",
    "my-component",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workItemConfigurationsList();
}

main().catch(console.error);
