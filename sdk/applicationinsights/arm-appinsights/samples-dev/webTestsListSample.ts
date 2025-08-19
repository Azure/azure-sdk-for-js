// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get all Application Insights web test definitions for the specified subscription.
 *
 * @summary Get all Application Insights web test definitions for the specified subscription.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2022-06-15/examples/WebTestList.json
 */

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function webTestList(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (let item of client.webTests.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await webTestList();
}

main().catch(console.error);
