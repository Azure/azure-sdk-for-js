// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an Application Insights web test.
 *
 * @summary deletes an Application Insights web test.
 * x-ms-original-file: 2022-06-15/WebTestDelete.json
 */
async function webTestDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  await client.webTests.delete("my-resource-group", "my-webtest-01-mywebservice");
}

async function main(): Promise<void> {
  await webTestDelete();
}

main().catch(console.error);
