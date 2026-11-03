// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesClient } from "@azure/arm-fileshares";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get file shares limits.
 *
 * @summary get file shares limits.
 * x-ms-original-file: 2026-06-01/FileShare_GetLimits_MaximumSet_Gen.json
 */
async function fileShareGetLimitsMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.informationalOperations.getLimits("westus");
  console.log(result);
}

/**
 * This sample demonstrates how to get file shares limits.
 *
 * @summary get file shares limits.
 * x-ms-original-file: 2026-06-01/FileShare_GetLimits_MinimumSet_Gen.json
 */
async function fileShareGetLimitsMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.informationalOperations.getLimits("westus");
  console.log(result);
}

async function main(): Promise<void> {
  await fileShareGetLimitsMaximumSet();
  await fileShareGetLimitsMinimumSet();
}

main().catch(console.error);
