// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FileSharesClient } = require("@azure/arm-fileshares");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements local CheckNameAvailability operations
 *
 * @summary implements local CheckNameAvailability operations
 * x-ms-original-file: 2026-06-01/FileShares_CheckNameAvailability_MaximumSet_Gen.json
 */
async function fileSharesCheckNameAvailabilityMaximumSet() {
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
async function fileSharesCheckNameAvailabilityMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.fileShares.checkNameAvailability("westus", {});
  console.log(result);
}

async function main() {
  await fileSharesCheckNameAvailabilityMaximumSet();
  await fileSharesCheckNameAvailabilityMinimumSet();
}

main().catch(console.error);
