// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Volume} from "@azure/arm-elasticsan";
import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a Volume.
 *
 * @summary Create a Volume.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/Volumes_Create_MaximumSet_Gen.json
 */
async function volumesCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const volumeName = "volumename";
  const parameters: Volume = {
    properties: {
      creationData: { createSource: "None", sourceId: "mdonegivjquite" },
      managedBy: { resourceId: "pclpkrpkpmvcsegcubrakcoodrubo" },
      sizeGiB: 23,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.beginCreateAndWait(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    volumeName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a Volume.
 *
 * @summary Create a Volume.
 * x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/ElasticSan/stable/2025-09-01/examples/Volumes_Create_MinimumSet_Gen.json
 */
async function volumesCreateMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["ELASTICSANS_SUBSCRIPTION_ID"] || "subscriptionid";
  const resourceGroupName =
    process.env["ELASTICSANS_RESOURCE_GROUP"] || "resourcegroupname";
  const elasticSanName = "elasticsanname";
  const volumeGroupName = "volumegroupname";
  const volumeName = "volumename";
  const parameters: Volume = { properties: { sizeGiB: 9 } };
  const credential = new DefaultAzureCredential();
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.beginCreateAndWait(
    resourceGroupName,
    elasticSanName,
    volumeGroupName,
    volumeName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumesCreateMaximumSetGen();
  await volumesCreateMinimumSetGen();
}

main().catch(console.error);
