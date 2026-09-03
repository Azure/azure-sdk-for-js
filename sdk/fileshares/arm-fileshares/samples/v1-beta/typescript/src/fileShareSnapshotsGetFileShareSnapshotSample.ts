// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesClient } from "@azure/arm-fileshares";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a FileShareSnapshot
 *
 * @summary get a FileShareSnapshot
 * x-ms-original-file: 2026-06-01/FileShareSnapshot_Get_MaximumSet_Gen.json
 */
async function fileShareSnapshotGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.fileShareSnapshots.getFileShareSnapshot(
    "rgfileshares",
    "fileshare",
    "testfilesharesnapshot",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await fileShareSnapshotGetMaximumSet();
}

main().catch(console.error);
