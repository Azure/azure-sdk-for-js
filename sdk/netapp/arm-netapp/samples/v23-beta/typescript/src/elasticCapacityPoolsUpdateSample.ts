// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch the specified NetApp Elastic Capacity Pool
 *
 * @summary patch the specified NetApp Elastic Capacity Pool
 * x-ms-original-file: 2025-09-01-preview/ElasticCapacityPools_Update.json
 */
async function elasticCapacityPoolsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticCapacityPools.update("myRG", "account1", "pool1", {
    properties: {
      size: 4398046511104,
      activeDirectoryConfigResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/activeDirectoryConfigs/activeDirectoryConfig1",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await elasticCapacityPoolsUpdate();
}

main().catch(console.error);
