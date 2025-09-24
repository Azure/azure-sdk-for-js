// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Get available Web app frameworks and their versions for location
 *
 * @summary Description for Get available Web app frameworks and their versions for location
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/GetWebAppStacksForLocation.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

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
