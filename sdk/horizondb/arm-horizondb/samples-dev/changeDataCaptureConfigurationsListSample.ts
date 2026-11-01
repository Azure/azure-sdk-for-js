// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists change data capture configurations in a HorizonDB cluster.
 *
 * @summary lists change data capture configurations in a HorizonDB cluster.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureConfigurations_List.json
 */
async function listMicrosoftFabricMirroringConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.changeDataCaptureConfigurations.list(
    "example-resource-group",
    "example-cluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listMicrosoftFabricMirroringConfigurations();
}

main().catch(console.error);
