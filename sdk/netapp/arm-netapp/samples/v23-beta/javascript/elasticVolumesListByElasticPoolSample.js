// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Elastic Volumes within the Elastic Capacity Pool
 *
 * @summary list all Elastic Volumes within the Elastic Capacity Pool
 * x-ms-original-file: 2025-09-01-preview/ElasticVolumes_ListByElasticPool.json
 */
async function elasticVolumesListByElasticPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticVolumes.listByElasticPool("myRG", "account1", "pool1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await elasticVolumesListByElasticPool();
}

main().catch(console.error);
