// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get available Web app frameworks and their versions for location
 *
 * @summary description for Get available Web app frameworks and their versions for location
 * x-ms-original-file: 2025-05-01/GetWebAppStacksForLocation.json
 */
async function getLocationsWebAppStacks(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.provider.getWebAppStacksForLocation("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getLocationsWebAppStacks();
}

main().catch(console.error);
