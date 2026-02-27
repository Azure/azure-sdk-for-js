// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get available Function app frameworks and their versions
 *
 * @summary description for Get available Function app frameworks and their versions
 * x-ms-original-file: 2025-05-01/GetFunctionAppStacks.json
 */
async function getFunctionAppStacks() {
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.provider.getFunctionAppStacks()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getFunctionAppStacks();
}

main().catch(console.error);
