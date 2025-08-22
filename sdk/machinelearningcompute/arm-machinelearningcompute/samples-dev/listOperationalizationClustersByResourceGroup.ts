// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Gets the clusters in the specified resource group.
 *
 * @summary Gets the clusters in the specified resource group.
 * x-ms-original-file: specification/machinelearningcompute/resource-manager/Microsoft.MachineLearningCompute/preview/2017-08-01-preview/examples/OperationalizationClusters_ListByResourceGroup.json
 */
import { MachineLearningComputeManagementClient } from "@azure/arm-machinelearningcompute";
import { DefaultAzureCredential } from "@azure/identity";

async function listOperationalizationClustersByResourceGroup(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new MachineLearningComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operationalizationClusters.listByResourceGroup(
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

listOperationalizationClustersByResourceGroup().catch(console.error);
