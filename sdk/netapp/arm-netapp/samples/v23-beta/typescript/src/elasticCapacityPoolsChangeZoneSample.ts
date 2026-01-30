// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to moves pool to another zone
 *
 * @summary moves pool to another zone
 * x-ms-original-file: 2025-09-01-preview/ElasticCapacityPools_ChangeZone.json
 */
async function elasticCapacityPoolsChangeZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticCapacityPools.changeZone("myRG", "account1", "pool1", {
    newZone: "3",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await elasticCapacityPoolsChangeZone();
}

main().catch(console.error);
