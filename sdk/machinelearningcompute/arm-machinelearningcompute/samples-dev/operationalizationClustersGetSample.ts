// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MachineLearningComputeManagementClient } from "@azure/arm-machinelearningcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets the operationalization cluster resource view. Note that the credentials are not returned by this call. Call ListKeys to get them.
 *
 * @summary Gets the operationalization cluster resource view. Note that the credentials are not returned by this call. Call ListKeys to get them.
 * x-ms-original-file: specification/machinelearningcompute/resource-manager/Microsoft.MachineLearningCompute/preview/2017-08-01-preview/examples/OperationalizationClusters_Get.json
 */
async function getOperationalizationCluster(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const clusterName = "myCluster";
  const credential = new DefaultAzureCredential();
  const client = new MachineLearningComputeManagementClient(credential, subscriptionId);
  const result = await client.operationalizationClusters.get(resourceGroupName, clusterName);
  console.log(result);
}

getOperationalizationCluster().catch(console.error);
