// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a log capture configuration for a HorizonDB cluster.
 *
 * @summary gets a log capture configuration for a HorizonDB cluster.
 * x-ms-original-file: 2026-10-01-preview/LogCaptureConfigurations_Get.json
 */
async function getThePostgreSQLServerLogCaptureConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.logCaptureConfigurations.get(
    "example-resource-group",
    "example-cluster",
    "PostgreSqlServer",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getThePostgreSQLServerLogCaptureConfiguration();
}

main().catch(console.error);
