// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an Application Insights component.
 *
 * @summary deletes an Application Insights component.
 * x-ms-original-file: 2020-02-02/ComponentsDelete.json
 */
async function componentsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  await client.components.delete("my-resource-group", "my-component");
}

async function main(): Promise<void> {
  await componentsDelete();
}

main().catch(console.error);
