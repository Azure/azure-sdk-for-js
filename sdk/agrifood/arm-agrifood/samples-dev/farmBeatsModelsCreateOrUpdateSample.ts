// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FarmBeats } from "@azure/arm-agrifood";
import { AgriFoodMgmtClient } from "@azure/arm-agrifood";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Create or update FarmBeats resource.
 *
 * @summary Create or update FarmBeats resource.
 * x-ms-original-file: specification/agrifood/resource-manager/Microsoft.AgFoodPlatform/preview/2021-09-01-preview/examples/FarmBeatsModels_CreateOrUpdate.json
 */
async function farmBeatsModelsCreateOrUpdate(): Promise<void> {
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = "examples-rg";
  const farmBeatsResourceName = "examples-farmbeatsResourceName";
  const body: FarmBeats = {
    location: "eastus2",
    tags: { key1: "value1", key2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AgriFoodMgmtClient(credential, subscriptionId);
  const result = await client.farmBeatsModels.createOrUpdate(
    resourceGroupName,
    farmBeatsResourceName,
    body,
  );
  console.log(result);
}

farmBeatsModelsCreateOrUpdate().catch(console.error);
