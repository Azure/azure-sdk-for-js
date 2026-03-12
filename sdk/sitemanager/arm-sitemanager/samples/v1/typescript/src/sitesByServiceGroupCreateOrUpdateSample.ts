// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeClient } from "@azure/arm-sitemanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Site at SG scope
 *
 * @summary create or update Site at SG scope
 * x-ms-original-file: 2025-06-01/SitesByServiceGroup_CreateOrUpdate_MaximumSet_Gen.json
 */
async function sitesByServiceGroupCreateOrUpdateGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new EdgeClient(credential, subscriptionId);
  const result = await client.sitesByServiceGroup.createOrUpdate("string", "string", {
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
  await sitesByServiceGroupCreateOrUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
