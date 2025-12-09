// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ElasticSnapshot
 *
 * @summary get a ElasticSnapshot
 * x-ms-original-file: 2025-09-01-preview/ElasticSnapshots_Get.json
 */
async function elasticSnapshotsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticSnapshots.get(
    "myRG",
    "account1",
    "pool1",
    "volume1",
    "snapshot1",
  );
  console.log(result);
}

async function main() {
  await elasticSnapshotsGet();
}

main().catch(console.error);
