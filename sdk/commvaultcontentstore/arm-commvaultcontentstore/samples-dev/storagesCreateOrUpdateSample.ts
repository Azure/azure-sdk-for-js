// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentStoreClient } from "@azure/arm-commvaultcontentstore";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Storage
 *
 * @summary create a Storage
 * x-ms-original-file: 2026-07-03-preview/Storages_CreateOrUpdate_MaximumSet_Gen.json
 */
async function storagesCreateOrUpdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.storages.createOrUpdate(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-storageName",
    {
      properties: {
        location: "idxxvyqhyxvahalfmkbjxklfbimouxnasnxdmaydqv",
        storageType: "Air_Gap_Protect",
        vendor: "Azure_Blob_Storage",
        class: "COLD",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storagesCreateOrUpdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
