// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get available Function app frameworks and their versions for location
 *
 * @summary description for Get available Function app frameworks and their versions for location
 * x-ms-original-file: 2025-05-01/GetFunctionAppStacksForLocation.json
 */
async function getLocationsFunctionAppStacks(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.provider.getFunctionAppStacksForLocation("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getLocationsFunctionAppStacks();
}

main().catch(console.error);
