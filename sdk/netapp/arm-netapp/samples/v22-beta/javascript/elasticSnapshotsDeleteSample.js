// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ElasticSnapshot
 *
 * @summary delete a ElasticSnapshot
 * x-ms-original-file: 2025-09-01-preview/ElasticSnapshots_Delete.json
 */
async function elasticSnapshotsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.elasticSnapshots.delete("myRG", "account1", "pool1", "volume1", "snapshot1");
}

async function main() {
  await elasticSnapshotsDelete();
}

main().catch(console.error);
