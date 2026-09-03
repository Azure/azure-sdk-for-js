// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesClient } from "@azure/arm-fileshares";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a FileShareSnapshot.
 *
 * @summary update a FileShareSnapshot.
 * x-ms-original-file: 2026-06-01/FileShareSnapshot_Update_MaximumSet_Gen.json
 */
async function fileShareSnapshotUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.fileShareSnapshots.updateFileShareSnapshot(
    "rgfileshares",
    "fileshare",
    "testfilesharesnapshot",
    { properties: { metadata: { key491: "dalhvhxqhjszelfuueetvxmgkbukwa" } } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await fileShareSnapshotUpdateMaximumSet();
}

main().catch(console.error);
