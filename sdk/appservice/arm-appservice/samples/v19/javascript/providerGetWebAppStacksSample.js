// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get available Web app frameworks and their versions
 *
 * @summary description for Get available Web app frameworks and their versions
 * x-ms-original-file: 2025-05-01/GetWebAppStacks.json
 */
async function getWebAppStacks() {
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.provider.getWebAppStacks()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getWebAppStacks();
}

main().catch(console.error);
