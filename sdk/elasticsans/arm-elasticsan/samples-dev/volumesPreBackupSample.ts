// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VolumeNameList, ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Validate whether a disk snapshot backup can be taken for list of volumes.
 *
 * @summary Validate whether a disk snapshot backup can be taken for list of volumes.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2024-07-01-preview/examples/Volumes_PreBackup_MaximumSet_Gen.json
 */
async function volumeGroupsPreBackupMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const parameters: VolumeNameList = { volumeNames: ["volumename"] };
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.beginPreBackupAndWait(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeGroupsPreBackupMaximumSetGen();
}

main().catch(console.error);
