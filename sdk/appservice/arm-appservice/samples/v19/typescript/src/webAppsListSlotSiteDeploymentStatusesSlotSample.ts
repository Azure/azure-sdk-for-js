// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list deployment statuses for an app (or deployment slot, if specified).
 *
 * @summary list deployment statuses for an app (or deployment slot, if specified).
 * x-ms-original-file: 2025-05-01/ListSiteDeploymentStatusSlot.json
 */
async function listDeploymentStatusSlot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webApps.listSlotSiteDeploymentStatusesSlot(
    "rg",
    "testSite",
    "stage",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDeploymentStatusSlot();
}

main().catch(console.error);
