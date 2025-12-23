// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the specified Elastic Volume
 *
 * @summary delete the specified Elastic Volume
 * x-ms-original-file: 2025-09-01-preview/ElasticVolumes_Delete.json
 */
async function elasticVolumesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.elasticVolumes.delete("myRG", "account1", "pool1", "volume1");
}

async function main() {
  await elasticVolumesDelete();
}

main().catch(console.error);
