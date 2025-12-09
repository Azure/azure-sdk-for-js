// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the specified NetApp Elastic Capacity Pool
 *
 * @summary delete the specified NetApp Elastic Capacity Pool
 * x-ms-original-file: 2025-09-01-preview/ElasticCapacityPools_Delete.json
 */
async function elasticCapacityPoolsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.elasticCapacityPools.delete("myRG", "account1", "pool1");
}

async function main() {
  await elasticCapacityPoolsDelete();
}

main().catch(console.error);
