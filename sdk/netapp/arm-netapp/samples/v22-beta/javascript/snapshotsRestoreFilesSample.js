// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restore the specified files from the specified snapshot to the active filesystem
 *
 * @summary restore the specified files from the specified snapshot to the active filesystem
 * x-ms-original-file: 2025-07-01-preview/Snapshots_SingleFileRestore.json
 */
async function snapshotsSingleFileRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.snapshots.restoreFiles("myRG", "account1", "pool1", "volume1", "snapshot1", {
    filePaths: ["/dir1/customer1.db", "/dir1/customer2.db"],
  });
}

async function main() {
  await snapshotsSingleFileRestore();
}

main().catch(console.error);
