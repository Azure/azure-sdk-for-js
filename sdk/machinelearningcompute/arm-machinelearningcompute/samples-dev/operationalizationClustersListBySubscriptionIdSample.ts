// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the operationalization clusters in the specified subscription.
 *
 * @summary Gets the operationalization clusters in the specified subscription.
 * x-ms-original-file: specification/machinelearningcompute/resource-manager/Microsoft.MachineLearningCompute/preview/2017-08-01-preview/examples/OperationalizationClusters_ListBySubscription.json
 */

import { MachineLearningComputeManagementClient } from "@azure/arm-machinelearningcompute";
import { DefaultAzureCredential } from "@azure/identity";

async function listOperationalizationClustersBySubscription(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new MachineLearningComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operationalizationClusters.listBySubscriptionId()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listOperationalizationClustersBySubscription().catch(console.error);
