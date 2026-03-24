// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppLinkClient } from "@azure/arm-applink";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AppLink resources by resource group.
 *
 * @summary list AppLink resources by resource group.
 * x-ms-original-file: 2025-08-01-preview/AppLinks_ListByResourceGroup.json
 */
async function appLinksListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appLinks.listByResourceGroup("test_rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await appLinksListByResourceGroup();
}

main().catch(console.error);
