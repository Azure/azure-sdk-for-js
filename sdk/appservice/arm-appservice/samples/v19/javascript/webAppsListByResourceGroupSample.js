// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets all web, mobile, and API apps in the specified resource group.
 *
 * @summary description for Gets all web, mobile, and API apps in the specified resource group.
 * x-ms-original-file: 2025-05-01/ListWebAppsByResourceGroup.json
 */
async function listWebAppsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webApps.listByResourceGroup("testrg123")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listWebAppsByResourceGroup();
}

main().catch(console.error);
