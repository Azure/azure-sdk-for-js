// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HyperVCollector, HyperVCollectorsCreateOptionalParams } from "@azure/arm-migrate";
import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or Update Hyper-V collector
 *
 * @summary Create or Update Hyper-V collector
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/HyperVCollectors_Create.json
 */
async function hyperVCollectorsCreate(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "8c3c936a-c09b-4de3-830b-3f5f244d72e9";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "contosoithyperv";
  const projectName = "migrateprojectce73project";
  const hyperVCollectorName = "migrateprojectce73collector";
  const collectorBody: HyperVCollector = {
    eTag: '"00000981-0000-0300-0000-5d74cd5f0000"',
    properties: {
      agentProperties: {
        spnDetails: {
          applicationId: "827f1053-44dc-439f-b832-05416dcce12b",
          audience:
            "https://72f988bf-86f1-41af-91ab-2d7cd011db47/migrateprojectce73agentauthaadapp",
          authority: "https://login.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47",
          objectId: "be75098e-c0fc-4ac4-98c7-282ebbcf8370",
          tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
        },
      },
      discoverySiteId:
        "/subscriptions/8c3c936a-c09b-4de3-830b-3f5f244d72e9/resourceGroups/ContosoITHyperV/providers/Microsoft.OffAzure/HyperVSites/migrateprojectce73site",
    },
  };
  const options: HyperVCollectorsCreateOptionalParams = { collectorBody };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.hyperVCollectors.create(
    resourceGroupName,
    projectName,
    hyperVCollectorName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hyperVCollectorsCreate();
}

main().catch(console.error);
