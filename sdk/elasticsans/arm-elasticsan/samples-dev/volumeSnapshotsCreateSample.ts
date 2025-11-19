// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Snapshot} from "@azure/arm-elasticsan";
import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a Volume Snapshot.
 *
 * @summary Create a Volume Snapshot.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/VolumeSnapshots_Create_MaximumSet_Gen.json
 */
async function volumeSnapshotsCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const snapshotName = "snapshotname";
  const parameters: Snapshot = {
    properties: {
      creationData: {
        sourceId:
          "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/volumes/{volumeName}",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeSnapshots.beginCreateAndWait(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    snapshotName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a Volume Snapshot.
 *
 * @summary Create a Volume Snapshot.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/VolumeSnapshots_Create_MinimumSet_Gen.json
 */
async function volumeSnapshotsCreateMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const snapshotName = "snapshotname";
  const parameters: Snapshot = {
    properties: {
      creationData: {
        sourceId:
          "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/volumes/{volumeName}",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeSnapshots.beginCreateAndWait(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    snapshotName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeSnapshotsCreateMaximumSetGen();
  await volumeSnapshotsCreateMinimumSetGen();
}

main().catch(console.error);
