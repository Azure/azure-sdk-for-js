// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeClient } from "@azure/arm-sitemanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Site
 *
 * @summary update a Site
 * x-ms-original-file: 2025-06-01/SitesBySubscription_Update_MaximumSet_Gen.json
 */
async function patchSiteSubscriptionGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0154f7fe-df09-4981-bf82-7ad5c1f596eb";
  const client = new EdgeClient(credential, subscriptionId);
  const result = await client.sitesBySubscription.update("string", {
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
  await patchSiteSubscriptionGeneratedByMaximumSetRule();
}

main().catch(console.error);
