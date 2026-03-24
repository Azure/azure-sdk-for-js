// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppLinkClient } = require("@azure/arm-applink");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an AppLink.
 *
 * @summary update an AppLink.
 * x-ms-original-file: 2025-08-01-preview/AppLinks_Update.json
 */
async function appLinksUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  const result = await client.appLinks.update("test_rg", "applink-test-01", {
    tags: { environment: "production", "cost-center": "platform" },
  });
  console.log(result);
}

async function main() {
  await appLinksUpdate();
}

main().catch(console.error);
