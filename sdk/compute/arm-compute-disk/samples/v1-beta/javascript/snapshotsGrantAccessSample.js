// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to grants access to a snapshot.
 *
 * @summary grants access to a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_BeginGetAccess.json
 */
async function getASasOnASnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.snapshots.grantAccess("myResourceGroup", "mySnapshot", {
    access: "Read",
    durationInSeconds: 300,
    fileFormat: "VHDX",
  });
  console.log(result);
}

async function main() {
  await getASasOnASnapshot();
}

main().catch(console.error);
