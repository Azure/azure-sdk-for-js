// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates mutable change data capture configuration properties. Omitted properties preserve their current values.
 *
 * @summary updates mutable change data capture configuration properties. Omitted properties preserve their current values.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureConfigurations_Update.json
 */
async function disableAMicrosoftFabricMirroringConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.changeDataCaptureConfigurations.update(
    "example-resource-group",
    "example-cluster",
    "sales-database",
    { properties: { desiredState: "Disabled" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await disableAMicrosoftFabricMirroringConfiguration();
}

main().catch(console.error);
