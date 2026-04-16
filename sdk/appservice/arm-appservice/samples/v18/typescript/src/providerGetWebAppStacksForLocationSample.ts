// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Get available Web app frameworks and their versions for location
 *
 * @summary Description for Get available Web app frameworks and their versions for location
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/GetWebAppStacksForLocation.json
 */
async function getLocationsWebAppStacks(): Promise<void> {
  const location = "westus";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.provider.listWebAppStacksForLocation(
    location,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getLocationsWebAppStacks();
}

main().catch(console.error);
