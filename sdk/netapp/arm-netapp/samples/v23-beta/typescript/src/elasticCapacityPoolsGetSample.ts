// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the NetApp Elastic Capacity Pool
 *
 * @summary get the NetApp Elastic Capacity Pool
 * x-ms-original-file: 2025-09-01-preview/ElasticCapacityPools_Get.json
 */
async function elasticCapacityPoolsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticCapacityPools.get("myRG", "account1", "pool1");
  console.log(result);
}

async function main(): Promise<void> {
  await elasticCapacityPoolsGet();
}

main().catch(console.error);
