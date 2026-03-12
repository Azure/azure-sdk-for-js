// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Gets the credentials for the specified cluster such as Storage, ACR and ACS credentials. This is a long running operation because it fetches keys from dependencies.
 *
 * @summary Gets the credentials for the specified cluster such as Storage, ACR and ACS credentials. This is a long running operation because it fetches keys from dependencies.
 * x-ms-original-file: specification/machinelearningcompute/resource-manager/Microsoft.MachineLearningCompute/preview/2017-08-01-preview/examples/OperationalizationClusters_ListKeys.json
 */
import { MachineLearningComputeManagementClient } from "@azure/arm-machinelearningcompute";
import { DefaultAzureCredential } from "@azure/identity";

async function listKeysOfAnOperationalizationCluster(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "myResourceGroup";
  const clusterName = "myCluster";
  const credential = new DefaultAzureCredential();
  const client = new MachineLearningComputeManagementClient(credential, subscriptionId);
  const result = await client.operationalizationClusters.listKeys(resourceGroupName, clusterName);
  console.log(result);
}

listKeysOfAnOperationalizationCluster().catch(console.error);
