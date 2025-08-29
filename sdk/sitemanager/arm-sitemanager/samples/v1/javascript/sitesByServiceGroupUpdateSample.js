// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeClient } = require("@azure/arm-sitemanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update Site at SG scope
 *
 * @summary update Site at SG scope
 * x-ms-original-file: 2025-06-01/SitesByServiceGroup_Update_MaximumSet_Gen.json
 */
async function sitesByServiceGroupUpdateGeneratedByMaximumSetRule() {
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

async function main() {
  await sitesByServiceGroupUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
