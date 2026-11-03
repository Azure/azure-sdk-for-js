// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Gets all scale-out instances of an app.
 *
 * @summary description for Gets all scale-out instances of an app.
 * x-ms-original-file: 2025-05-01/GetSiteInstanceInfo.json
 */
async function getSiteInstanceInfo(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getInstanceInfo("testrg123", "tests346", "134987120");
  console.log(result);
}

async function main(): Promise<void> {
  await getSiteInstanceInfo();
}

main().catch(console.error);
