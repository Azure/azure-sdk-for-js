// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all Application Insights web test definitions for the specified subscription.
 *
 * @summary get all Application Insights web test definitions for the specified subscription.
 * x-ms-original-file: 2022-06-15/WebTestList.json
 */
async function webTestList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webTests.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await webTestList();
}

main().catch(console.error);
