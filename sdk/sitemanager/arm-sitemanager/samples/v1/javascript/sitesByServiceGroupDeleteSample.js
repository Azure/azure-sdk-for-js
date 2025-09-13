// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeClient } = require("@azure/arm-sitemanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Site at SG scope
 *
 * @summary delete Site at SG scope
 * x-ms-original-file: 2025-06-01/SitesByServiceGroup_Delete_MaximumSet_Gen.json
 */
async function sitesByServiceGroupDeleteGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new EdgeClient(credential, subscriptionId);
  await client.sitesByServiceGroup.delete("string", "string");
}

async function main() {
  await sitesByServiceGroupDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
