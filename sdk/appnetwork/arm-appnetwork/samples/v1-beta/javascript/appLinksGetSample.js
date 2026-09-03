// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppLinkClient } = require("@azure/arm-appnetwork");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an AppLink.
 *
 * @summary get an AppLink.
 * x-ms-original-file: 2025-08-01-preview/AppLinks_Get.json
 */
async function appLinksGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  const result = await client.appLinks.get("test_rg", "applink-test-01");
  console.log(result);
}

async function main() {
  await appLinksGet();
}

main().catch(console.error);
