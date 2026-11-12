// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a change data capture configuration after destination-side replication has been stopped or detached. This operation never deletes the Microsoft Fabric mirrored-database item.
 *
 * @summary deletes a change data capture configuration after destination-side replication has been stopped or detached. This operation never deletes the Microsoft Fabric mirrored-database item.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureConfigurations_Delete.json
 */
async function deleteAMicrosoftFabricMirroringConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.changeDataCaptureConfigurations.delete(
    "example-resource-group",
    "example-cluster",
    "sales-database",
  );
}

async function main(): Promise<void> {
  await deleteAMicrosoftFabricMirroringConfiguration();
}

main().catch(console.error);
