// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesClient } from "@azure/arm-fileshares";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements local CheckNameAvailability operations
 *
 * @summary implements local CheckNameAvailability operations
 * x-ms-original-file: 2026-06-01/FileShares_CheckNameAvailability_MaximumSet_Gen.json
 */
async function fileSharesCheckNameAvailabilityMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.fileShares.checkNameAvailability("westus", {
    name: "fvykqbgmd",
    type: "Microsoft.FileShares/fileShares",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to implements local CheckNameAvailability operations
 *
 * @summary implements local CheckNameAvailability operations
 * x-ms-original-file: 2026-06-01/FileShares_CheckNameAvailability_MinimumSet_Gen.json
 */
async function fileSharesCheckNameAvailabilityMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.fileShares.checkNameAvailability("westus", {});
  console.log(result);
}

async function main(): Promise<void> {
  await fileSharesCheckNameAvailabilityMaximumSet();
  await fileSharesCheckNameAvailabilityMinimumSet();
}

main().catch(console.error);
