// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete a Server collector from the project.
 *
 * @summary Delete a Server collector from the project.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/ServerCollectors_Delete.json
 */
async function serverCollectorsDelete(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "pajindtest";
  const projectName = "app11141project";
  const serverCollectorName = "app23df4collector";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.serverCollectors.delete(
    resourceGroupName,
    projectName,
    serverCollectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await serverCollectorsDelete();
}

main().catch(console.error);
