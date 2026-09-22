// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesClient } from "@azure/arm-fileshares";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a FileShareSnapshot.
 *
 * @summary delete a FileShareSnapshot.
 * x-ms-original-file: 2026-06-01/FileShareSnapshot_Delete_MaximumSet_Gen.json
 */
async function fileShareSnapshotDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  await client.fileShareSnapshots.deleteFileShareSnapshot(
    "rgfileshares",
    "fileshare",
    "testfilesharesnapshot",
  );
}

async function main(): Promise<void> {
  await fileShareSnapshotDeleteMaximumSet();
}

main().catch(console.error);
