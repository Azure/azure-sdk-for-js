// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FileSharesClient } = require("@azure/arm-fileshares");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a FileShareSnapshot.
 *
 * @summary delete a FileShareSnapshot.
 * x-ms-original-file: 2026-06-01/FileShareSnapshot_Delete_MaximumSet_Gen.json
 */
async function fileShareSnapshotDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  await client.fileShareSnapshots.deleteFileShareSnapshot(
    "rgfileshares",
    "fileshare",
    "testfilesharesnapshot",
  );
}

async function main() {
  await fileShareSnapshotDeleteMaximumSet();
}

main().catch(console.error);
