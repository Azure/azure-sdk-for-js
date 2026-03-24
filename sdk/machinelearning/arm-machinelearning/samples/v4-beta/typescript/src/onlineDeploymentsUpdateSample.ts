// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update Online Deployment (asynchronous).
 *
 * @summary update Online Deployment (asynchronous).
 * x-ms-original-file: 2025-12-01/OnlineDeployment/KubernetesOnlineDeployment/update.json
 */
async function updateKubernetesOnlineDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.onlineDeployments.update(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    "testDeploymentName",
    {
      sku: { name: "string", capacity: 1, family: "string", size: "string", tier: "Free" },
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update Online Deployment (asynchronous).
 *
 * @summary update Online Deployment (asynchronous).
 * x-ms-original-file: 2025-12-01/OnlineDeployment/ManagedOnlineDeployment/update.json
 */
async function updateManagedOnlineDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.onlineDeployments.update(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    "testDeploymentName",
    {
      sku: { name: "string", capacity: 1, family: "string", size: "string", tier: "Free" },
      tags: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateKubernetesOnlineDeployment();
  await updateManagedOnlineDeployment();
}

main().catch(console.error);
