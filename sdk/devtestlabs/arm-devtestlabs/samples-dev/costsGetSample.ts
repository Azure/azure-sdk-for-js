// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Get cost.
 *
 * @summary Get cost.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Costs_Get.json
 */
async function costsGet(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "targetCost";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.costs.get(resourceGroupName, labName, name);
  console.log(result);
}

costsGet().catch(console.error);
