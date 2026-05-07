// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FileSharesClient } = require("@azure/arm-fileshares");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get file shares usage data.
 *
 * @summary get file shares usage data.
 * x-ms-original-file: 2026-06-01/FileShare_GetUsageData_MaximumSet_Gen.json
 */
async function fileShareGetUsageDataMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.informationalOperations.getUsageData("westus");
  console.log(result);
}

/**
 * This sample demonstrates how to get file shares usage data.
 *
 * @summary get file shares usage data.
 * x-ms-original-file: 2026-06-01/FileShare_GetUsageData_MinimumSet_Gen.json
 */
async function fileShareGetUsageDataMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.informationalOperations.getUsageData("westus");
  console.log(result);
}

async function main() {
  await fileShareGetUsageDataMaximumSet();
  await fileShareGetUsageDataMinimumSet();
}

main().catch(console.error);
