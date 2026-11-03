// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesClient } from "@azure/arm-fileshares";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a FileShare
 *
 * @summary get a FileShare
 * x-ms-original-file: 2026-06-01/FileShares_Get_MaximumSet_Gen.json
 */
async function fileSharesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.fileShares.get("rgfileshares", "fileshare");
  console.log(result);
}

async function main(): Promise<void> {
  await fileSharesGetMaximumSet();
}

main().catch(console.error);
