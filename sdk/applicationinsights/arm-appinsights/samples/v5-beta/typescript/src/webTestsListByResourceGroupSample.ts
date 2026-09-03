// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all Application Insights web tests defined for the specified resource group.
 *
 * @summary get all Application Insights web tests defined for the specified resource group.
 * x-ms-original-file: 2022-06-15/WebTestListByResourceGroup.json
 */
async function webTestListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webTests.listByResourceGroup("my-resource-group")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await webTestListByResourceGroup();
}

main().catch(console.error);
