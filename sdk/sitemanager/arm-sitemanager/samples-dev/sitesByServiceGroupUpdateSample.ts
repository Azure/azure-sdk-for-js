// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeClient } from "@azure/arm-sitemanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Site
 *
 * @summary update a Site
 * x-ms-original-file: 2025-06-01/SitesByServiceGroup_Update_MaximumSet_Gen.json
 */
async function sitesByServiceGroupUpdateGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EdgeClient(credential);
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
