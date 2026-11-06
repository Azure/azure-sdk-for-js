// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to forces a fresh revision for an Active Backup primary Web App and re-syncs all of its silos. The refresh request is recorded synchronously; silos then converge asynchronously — track progress through each silo's revisionNumber.
 *
 * @summary forces a fresh revision for an Active Backup primary Web App and re-syncs all of its silos. The refresh request is recorded synchronously; silos then converge asynchronously — track progress through each silo's revisionNumber.
 * x-ms-original-file: 2026-08-01/SiteSiloResources_RefreshSiteSilos.json
 */
async function forceAFreshRevisionAndReSyncAllSilosOfAWebApp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.siteSiloResources.refreshSiteSilos("testrg123", "sitef6141");
}

async function main(): Promise<void> {
  await forceAFreshRevisionAndReSyncAllSilosOfAWebApp();
}

main().catch(console.error);
