// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Inference Endpoint Deployment Skus.
 *
 * @summary list Inference Endpoint Deployment Skus.
 * x-ms-original-file: 2025-12-01/OnlineDeployment/KubernetesOnlineDeployment/listSkus.json
 */
async function listKubernetesOnlineDeploymentSkus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.onlineDeployments.listSkus(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    "testDeploymentName",
    { count: 1 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list Inference Endpoint Deployment Skus.
 *
 * @summary list Inference Endpoint Deployment Skus.
 * x-ms-original-file: 2025-12-01/OnlineDeployment/ManagedOnlineDeployment/listSkus.json
 */
async function listManagedOnlineDeploymentSkus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.onlineDeployments.listSkus(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    "testDeploymentName",
    { count: 1 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listKubernetesOnlineDeploymentSkus();
  await listManagedOnlineDeploymentSkus();
}

main().catch(console.error);
