// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeClient } = require("@azure/arm-sitemanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Site
 *
 * @summary create a Site
 * x-ms-original-file: 2025-03-01-preview/SitesBySubscription_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createSiteSubscriptionGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0154f7fe-df09-4981-bf82-7ad5c1f596eb";
  const client = new EdgeClient(credential, subscriptionId);
  const result = await client.sitesBySubscription.createOrUpdate("string", {
    properties: {
      displayName: "string",
      labels: { key8188: "mcgnu" },
      description: "enxcmpvfvadbapo",
      siteAddress: {
        streetAddress1: "fodimymrxbhrfslsmzfhmitn",
        streetAddress2: "widjg",
        city: "zkcbzjkatafo",
        stateOrProvince: "wk",
        country: "xeevcfvimlfzsfuxtyujw",
        postalCode: "qbrhqk",
      },
    },
  });
  console.log(result);
}

async function main() {
  await createSiteSubscriptionGeneratedByMaximumSetRule();
}

main().catch(console.error);
