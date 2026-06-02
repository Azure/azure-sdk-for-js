// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Gets the details of a web, mobile, or API app.
 *
 * @summary description for Gets the details of a web, mobile, or API app.
 * x-ms-original-file: 2025-05-01/GetWebAppSlot.json
 */
async function getWebAppSlot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getSlot("testrg123", "sitef6141", "staging");
  console.log(result);
}

async function main(): Promise<void> {
  await getWebAppSlot();
}

main().catch(console.error);
