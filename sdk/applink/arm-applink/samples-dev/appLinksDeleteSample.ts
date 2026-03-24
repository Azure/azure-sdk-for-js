// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppLinkClient } from "@azure/arm-applink";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an AppLink.
 *
 * @summary delete an AppLink.
 * x-ms-original-file: 2025-08-01-preview/AppLinks_Delete.json
 */
async function appLinksDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  await client.appLinks.delete("test_rg", "applink-test-01");
}

async function main(): Promise<void> {
  await appLinksDelete();
}

main().catch(console.error);
