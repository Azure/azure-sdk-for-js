// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Get available Function app frameworks and their versions
 *
 * @summary Description for Get available Function app frameworks and their versions
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/GetFunctionAppStacks.json
 */
async function getFunctionAppStacks(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.provider.listFunctionAppStacks()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getFunctionAppStacks();
}

main().catch(console.error);
