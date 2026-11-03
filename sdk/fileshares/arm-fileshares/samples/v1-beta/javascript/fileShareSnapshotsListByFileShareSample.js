// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FileSharesClient } = require("@azure/arm-fileshares");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list FileShareSnapshot by FileShare.
 *
 * @summary list FileShareSnapshot by FileShare.
 * x-ms-original-file: 2026-06-01/FileShareSnapshot_List_MaximumSet_Gen.json
 */
async function fileShareSnapshotListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileShareSnapshots.listByFileShare("rgfileshares", "fileshare")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list FileShareSnapshot by FileShare.
 *
 * @summary list FileShareSnapshot by FileShare.
 * x-ms-original-file: 2026-06-01/FileShareSnapshot_List_MinimumSet_Gen.json
 */
async function fileShareSnapshotListMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0681745E-3F9F-4966-80E6-69624A3B29F2";
  const client = new FileSharesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fileShareSnapshots.listByFileShare(
    "rgfileshares",
    "testfileshare",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await fileShareSnapshotListMaximumSet();
  await fileShareSnapshotListMinimumSet();
}

main().catch(console.error);
