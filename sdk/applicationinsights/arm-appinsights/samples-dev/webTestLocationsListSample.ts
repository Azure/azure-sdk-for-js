// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of web test locations available to this Application Insights component.
 *
 * @summary gets a list of web test locations available to this Application Insights component.
 * x-ms-original-file: 2015-05-01/WebTestLocationsList.json
 */
async function webTestLocationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webTestLocations.list("my-resource-group", "my-component")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await webTestLocationsList();
}

main().catch(console.error);
