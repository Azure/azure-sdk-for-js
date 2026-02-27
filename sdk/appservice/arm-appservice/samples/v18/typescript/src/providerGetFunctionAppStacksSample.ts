// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get available Function app frameworks and their versions
 *
 * @summary description for Get available Function app frameworks and their versions
 * x-ms-original-file: 2025-05-01/GetFunctionAppStacks.json
 */
async function getFunctionAppStacks(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.provider.getFunctionAppStacks()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getFunctionAppStacks();
}

main().catch(console.error);
