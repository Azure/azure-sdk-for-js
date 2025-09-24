// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or Update Import collector
 *
 * @summary Create or Update Import collector
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/ImportCollectors_Create.json
 */

import type { ImportCollector, ImportCollectorsCreateOptionalParams } from "@azure/arm-migrate";
import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function importCollectorsCreate(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "31be0ff4-c932-4cb3-8efc-efa411d79280";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "markusavstestrg";
  const projectName = "rajoshCCY9671project";
  const importCollectorName = "importCollector2952";
  const collectorBody: ImportCollector = {
    name: "importCollector2951",
    type: "Microsoft.Migrate/assessmentprojects/importcollectors",
    eTag: '"000064a2-0000-3300-0000-605994800000"',
    id: "/subscriptions/31be0ff4-c932-4cb3-8efc-efa411d79280/resourceGroups/markusavstestrg/providers/Microsoft.Migrate/assessmentprojects/rajoshCCY9671project/importcollectors/importCollector2951",
    properties: {
      discoverySiteId:
        "/subscriptions/31be0ff4-c932-4cb3-8efc-efa411d79280/resourcegroups/MarkusAVStestRG/providers/microsoft.offazure/importsites/rajoshCCY54cbimportSite",
    },
  };
  const options: ImportCollectorsCreateOptionalParams = { collectorBody };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.importCollectors.create(
    resourceGroupName,
    projectName,
    importCollectorName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await importCollectorsCreate();
}

main().catch(console.error);
