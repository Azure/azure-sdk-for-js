// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete a Hyper-V collector from the project.
 *
 * @summary Delete a Hyper-V collector from the project.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/HyperVCollectors_Delete.json
 */
async function hyperVCollectorsDelete(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "8c3c936a-c09b-4de3-830b-3f5f244d72e9";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "contosoithyperv";
  const projectName = "migrateprojectce73project";
  const hyperVCollectorName = "migrateprojectce73collector";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.hyperVCollectors.delete(
    resourceGroupName,
    projectName,
    hyperVCollectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hyperVCollectorsDelete();
}

main().catch(console.error);
