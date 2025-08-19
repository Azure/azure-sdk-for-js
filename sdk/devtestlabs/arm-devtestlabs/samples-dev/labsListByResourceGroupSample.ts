// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to List labs in a resource group.
 *
 * @summary List labs in a resource group.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Labs_ListByResourceGroup.json
 */
async function labsListByResourceGroup(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.labs.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

labsListByResourceGroup().catch(console.error);
