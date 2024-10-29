// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementClient } from "@azure/arm-standbypool";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a StandbyContainerGroupPoolRuntimeViewResource
 *
 * @summary get a StandbyContainerGroupPoolRuntimeViewResource
 * x-ms-original-file: 2024-03-01/StandbyContainerGroupPoolRuntimeViews_Get.json
 */
async function standbyContainerGroupPoolRuntimeViewsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const result = await client.standbyContainerGroupPoolRuntimeViews.get(
    "rgstandbypool",
    "pool",
    "latest",
  );
  console.log(result);
}

async function main() {
  standbyContainerGroupPoolRuntimeViewsGet();
}

main().catch(console.error);
