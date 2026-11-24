// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a log capture configuration. Omitted properties preserve their current values.
 *
 * @summary updates a log capture configuration. Omitted properties preserve their current values.
 * x-ms-original-file: 2026-10-01-preview/LogCaptureConfigurations_Update.json
 */
async function disablePostgreSQLServerLogCapture(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.logCaptureConfigurations.update(
    "example-resource-group",
    "example-cluster",
    "PostgreSqlServer",
    { properties: { state: "Disabled" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await disablePostgreSQLServerLogCapture();
}

main().catch(console.error);
