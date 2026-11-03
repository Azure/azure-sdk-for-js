// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list validation test version catalog entries
 *
 * @summary list validation test version catalog entries
 * x-ms-original-file: 2026-08-01-preview/ValidationTestVersions_List_MaximumSet_Gen.json
 */
async function validationTestVersionsListMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.validationTestVersions.list("linux-quality-validation", {
    filter: "audience eq 'Public'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await validationTestVersionsListMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
