// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Gets all web, mobile, and API apps in the specified resource group.
 *
 * @summary description for Gets all web, mobile, and API apps in the specified resource group.
 * x-ms-original-file: 2025-05-01/ListWebAppsByResourceGroup.json
 */
async function listWebAppsByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webApps.listByResourceGroup("testrg123")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWebAppsByResourceGroup();
}

main().catch(console.error);
