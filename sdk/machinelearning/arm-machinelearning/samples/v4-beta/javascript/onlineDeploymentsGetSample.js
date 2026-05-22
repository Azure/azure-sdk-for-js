// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Inference Deployment Deployment.
 *
 * @summary get Inference Deployment Deployment.
 * x-ms-original-file: 2025-12-01/OnlineDeployment/KubernetesOnlineDeployment/get.json
 */
async function getKubernetesOnlineDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.onlineDeployments.get(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    "testDeploymentName",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get Inference Deployment Deployment.
 *
 * @summary get Inference Deployment Deployment.
 * x-ms-original-file: 2025-12-01/OnlineDeployment/ManagedOnlineDeployment/get.json
 */
async function getManagedOnlineDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.onlineDeployments.get(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    "testDeploymentName",
  );
  console.log(result);
}

async function main() {
  await getKubernetesOnlineDeployment();
  await getManagedOnlineDeployment();
}

main().catch(console.error);
