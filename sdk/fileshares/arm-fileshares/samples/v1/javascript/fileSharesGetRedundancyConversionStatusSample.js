// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FileSharesClient } = require("@azure/arm-fileshares");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status and details of the current or most recent redundancy conversion for the file share.
 *
 * @summary gets the status and details of the current or most recent redundancy conversion for the file share.
 * x-ms-original-file: 2026-09-01/FileShares_GetRedundancyConversionStatus_MaximumSet_Gen.json
 */
async function fileSharesGetRedundancyConversionStatusMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.fileShares.getRedundancyConversionStatus("rgfileshares", "fileshare");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the status and details of the current or most recent redundancy conversion for the file share.
 *
 * @summary gets the status and details of the current or most recent redundancy conversion for the file share.
 * x-ms-original-file: 2026-09-01/FileShares_GetRedundancyConversionStatus_MinimumSet_Gen.json
 */
async function fileSharesGetRedundancyConversionStatusMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.fileShares.getRedundancyConversionStatus("rgfileshares", "fileshare");
  console.log(result);
}

async function main() {
  await fileSharesGetRedundancyConversionStatusMaximumSet();
  await fileSharesGetRedundancyConversionStatusMinimumSet();
}

main().catch(console.error);
