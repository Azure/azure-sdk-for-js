// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeClient } = require("@azure/arm-sitemanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Site
 *
 * @summary delete a Site
 * x-ms-original-file: 2025-06-01/SitesBySubscription_Delete_MaximumSet_Gen.json
 */
async function deleteSiteSubscriptionGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0154f7fe-df09-4981-bf82-7ad5c1f596eb";
  const client = new EdgeClient(credential, subscriptionId);
  await client.sitesBySubscription.delete("string");
}

async function main() {
  await deleteSiteSubscriptionGeneratedByMaximumSetRule();
}

main().catch(console.error);
