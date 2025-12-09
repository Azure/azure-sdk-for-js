// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if an Elastic Volume file path is available within the given Elastic Capacity Pool.
 *
 * @summary check if an Elastic Volume file path is available within the given Elastic Capacity Pool.
 * x-ms-original-file: 2025-09-01-preview/ElasticCapacityPools_CheckVolumeFilePathAvailability.json
 */
async function elasticCapacityPoolsCheckVolumeFilePathAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticCapacityPools.checkVolumeFilePathAvailability(
    "myRG",
    "account1",
    "pool1",
    { filePath: "my-exact-filepth" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await elasticCapacityPoolsCheckVolumeFilePathAvailability();
}

main().catch(console.error);
