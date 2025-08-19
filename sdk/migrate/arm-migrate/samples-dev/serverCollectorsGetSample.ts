// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a Server collector.
 *
 * @summary Get a Server collector.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/ServerCollectors_Get.json
 */

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function serverCollectorsGet(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "pajindtest";
  const projectName = "app11141project";
  const serverCollectorName = "app23df4collector";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.serverCollectors.get(
    resourceGroupName,
    projectName,
    serverCollectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await serverCollectorsGet();
}

main().catch(console.error);
