// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an Application Insights component.
 *
 * @summary deletes an Application Insights component.
 * x-ms-original-file: 2025-01-23-preview/ComponentsDelete.json
 */
async function componentsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  await client.components.delete("my-resource-group", "my-component");
}

async function main(): Promise<void> {
  await componentsDelete();
}

main().catch(console.error);
