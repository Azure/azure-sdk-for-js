// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update Site at SG scope
 *
 * @summary update Site at SG scope
 * x-ms-original-file: 2025-03-01-preview/SitesByServiceGroup_Update_MaximumSet_Gen.json
 */

import { EdgeClient } from "@azure/arm-sitemanager";
import { DefaultAzureCredential } from "@azure/identity";

async function sitesByServiceGroupUpdateGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new EdgeClient(credential, subscriptionId);
  const result = await client.sitesByServiceGroup.update("string", "string", {
    properties: {
      displayName: "string",
      description: "zztr",
      siteAddress: {
        streetAddress1: "fodimymrxbhrfslsmzfhmitn",
        streetAddress2: "widjg",
        city: "zkcbzjkatafo",
        stateOrProvince: "wk",
        country: "xeevcfvimlfzsfuxtyujw",
        postalCode: "qbrhqk",
      },
      labels: { key9939: "jdlzxcvcfqmruq" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await sitesByServiceGroupUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
