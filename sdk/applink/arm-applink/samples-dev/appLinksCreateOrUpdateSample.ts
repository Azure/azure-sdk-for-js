// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppLinkClient } from "@azure/arm-applink";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create an AppLink.
 *
 * @summary create an AppLink.
 * x-ms-original-file: 2025-08-01-preview/AppLinks_CreateOrUpdate.json
 */
async function appLinksCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  const result = await client.appLinks.createOrUpdate("test_rg", "applink-test-01", {
    properties: {},
    identity: { type: "SystemAssigned" },
    tags: { key2913: "test_tag" },
    location: "westus2",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await appLinksCreateOrUpdate();
}

main().catch(console.error);
