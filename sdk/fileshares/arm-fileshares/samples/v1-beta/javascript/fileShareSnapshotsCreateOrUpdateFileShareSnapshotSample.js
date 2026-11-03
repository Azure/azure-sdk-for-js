// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FileSharesClient } = require("@azure/arm-fileshares");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a FileShareSnapshot.
 *
 * @summary create a FileShareSnapshot.
 * x-ms-original-file: 2026-06-01/FileShareSnapshot_CreateOrUpdate_MaximumSet_Gen.json
 */
async function fileShareSnapshotCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const result = await client.fileShareSnapshots.createOrUpdateFileShareSnapshot(
    "rgfileshares",
    "fileshare",
    "testfilesharesnapshot",
    { properties: { initiatorId: "backup-vault-001", metadata: { key9372: "jtc" } } },
  );
  console.log(result);
}

async function main() {
  await fileShareSnapshotCreateOrUpdateMaximumSet();
}

main().catch(console.error);
