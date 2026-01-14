// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revert an Elastic Volume to the snapshot specified in the body
 *
 * @summary revert an Elastic Volume to the snapshot specified in the body
 * x-ms-original-file: 2025-09-01-preview/ElasticVolumes_Revert.json
 */
async function elasticVolumesRevert(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticVolumes.revert("myRG", "account1", "pool1", "volume1", {
    snapshotResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/elasticAccounts/account1/elasticCapacityPools/pool1/elasticVolumes/volume1/elasticSnapshots/snapshot1",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await elasticVolumesRevert();
}

main().catch(console.error);
