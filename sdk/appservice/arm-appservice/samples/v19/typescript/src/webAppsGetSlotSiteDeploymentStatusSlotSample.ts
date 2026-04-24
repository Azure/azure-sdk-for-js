// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the deployment status for an app (or deployment slot, if specified).
 *
 * @summary gets the deployment status for an app (or deployment slot, if specified).
 * x-ms-original-file: 2025-05-01/GetSiteDeploymentStatusSlot.json
 */
async function getDeploymentStatusSlot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getSlotSiteDeploymentStatusSlot(
    "rg",
    "testSite",
    "stage",
    "eacfd68b-3bbd-4ad9-99c5-98614d89c8e5",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDeploymentStatusSlot();
}

main().catch(console.error);
