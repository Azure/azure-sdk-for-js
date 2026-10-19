// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FileSharesClient } = require("@azure/arm-fileshares");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a redundancy conversion for the file share.
 *
 * @summary starts a redundancy conversion for the file share.
 * x-ms-original-file: 2026-09-01/FileShares_StartRedundancyConversion_MaximumSet_Gen.json
 */
async function fileSharesStartRedundancyConversionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  await client.fileShares.startRedundancyConversion("rgfileshares", "fileshare", {
    properties: { targetRedundancy: "Zone" },
  });
}

async function main() {
  await fileSharesStartRedundancyConversionMaximumSet();
}

main().catch(console.error);
