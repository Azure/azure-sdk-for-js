// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validate whether a disk snapshot backup can be taken for list of volumes.
 *
 * @summary validate whether a disk snapshot backup can be taken for list of volumes.
 * x-ms-original-file: 2025-09-01/Volumes_PreBackup_MaximumSet_Gen.json
 */
async function volumeGroupsPreBackupMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.preBackup(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    { volumeNames: ["volumename"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeGroupsPreBackupMaximumSetGen();
}

main().catch(console.error);
