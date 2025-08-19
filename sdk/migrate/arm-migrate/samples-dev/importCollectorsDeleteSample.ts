// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a Import collector from the project.
 *
 * @summary Delete a Import collector from the project.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/ImportCollectors_Delete.json
 */

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function importCollectorsDelete(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "31be0ff4-c932-4cb3-8efc-efa411d79280";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "markusavstestrg";
  const projectName = "rajoshCCY9671project";
  const importCollectorName = "importCollector2952";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.importCollectors.delete(
    resourceGroupName,
    projectName,
    importCollectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await importCollectorsDelete();
}

main().catch(console.error);
