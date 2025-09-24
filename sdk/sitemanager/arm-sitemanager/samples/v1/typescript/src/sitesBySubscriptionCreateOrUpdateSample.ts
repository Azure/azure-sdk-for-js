// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeClient } from "@azure/arm-sitemanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Site
 *
 * @summary create a Site
 * x-ms-original-file: 2025-06-01/SitesBySubscription_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createSiteSubscriptionGeneratedByMaximumSetRule(): Promise<void> {
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

async function main(): Promise<void> {
  await createSiteSubscriptionGeneratedByMaximumSetRule();
}

main().catch(console.error);
