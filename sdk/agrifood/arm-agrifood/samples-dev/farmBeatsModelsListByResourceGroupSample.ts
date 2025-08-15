// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgriFoodMgmtClient } from "@azure/arm-agrifood";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Lists the FarmBeats instances for a resource group.
 *
 * @summary Lists the FarmBeats instances for a resource group.
 * x-ms-original-file: specification/agrifood/resource-manager/Microsoft.AgFoodPlatform/preview/2021-09-01-preview/examples/FarmBeatsModels_ListByResourceGroup.json
 */
async function farmBeatsModelsListByResourceGroup(): Promise<void> {
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = "examples-rg";
  const credential = new DefaultAzureCredential();
  const client = new AgriFoodMgmtClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.farmBeatsModels.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

farmBeatsModelsListByResourceGroup().catch(console.error);
