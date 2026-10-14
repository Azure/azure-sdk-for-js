// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an Volume.
 *
 * @summary update an Volume.
 * x-ms-original-file: 2026-05-01-preview/Volumes_Update_MaximumSet_Gen.json
 */
async function volumesUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.update(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "volumename",
    {
      properties: {
        managedBy: [
          {
            clientId: "pclpkrpkpmvcsegcubrakcoodrubo",
            version: 1,
            resourceIds: [
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.SomeProvider/someResource/myResource",
            ],
          },
        ],
        sizeGiB: 7,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update an Volume.
 *
 * @summary update an Volume.
 * x-ms-original-file: 2026-05-01-preview/Volumes_Update_MinimumSet_Gen.json
 */
async function volumesUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumes.update(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "volumename",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumesUpdateMaximumSetGen();
  await volumesUpdateMinimumSetGen();
}

main().catch(console.error);
