// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Gets the configuration of an app, such as platform version and bitness, default documents, virtual applications, Always On, etc.
 *
 * @summary description for Gets the configuration of an app, such as platform version and bitness, default documents, virtual applications, Always On, etc.
 * x-ms-original-file: 2025-05-01/GetSiteConfig.json
 */
async function getSiteConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getConfiguration("testrg123", "sitef6141");
  console.log(result);
}

async function main(): Promise<void> {
  await getSiteConfig();
}

main().catch(console.error);
