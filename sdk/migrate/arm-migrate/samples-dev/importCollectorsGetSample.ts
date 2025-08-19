// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a Import collector.
 *
 * @summary Get a Import collector.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/ImportCollectors_Get.json
 */

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function importCollectorsGet(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "31be0ff4-c932-4cb3-8efc-efa411d79280";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "markusavstestrg";
  const projectName = "rajoshCCY9671project";
  const importCollectorName = "importCollector2951";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.importCollectors.get(
    resourceGroupName,
    projectName,
    importCollectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await importCollectorsGet();
}

main().catch(console.error);
