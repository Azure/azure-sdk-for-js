// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get Inference Deployment Deployment.
 *
 * @summary Get Inference Deployment Deployment.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/OnlineDeployment/KubernetesOnlineDeployment/get.json
 */

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getKubernetesOnlineDeployment(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "test-rg";
  const workspaceName = "my-aml-workspace";
  const endpointName = "testEndpointName";
  const deploymentName = "testDeploymentName";
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.onlineDeployments.get(
    resourceGroupName,
    workspaceName,
    endpointName,
    deploymentName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get Inference Deployment Deployment.
 *
 * @summary Get Inference Deployment Deployment.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/OnlineDeployment/ManagedOnlineDeployment/get.json
 */
async function getManagedOnlineDeployment(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "test-rg";
  const workspaceName = "my-aml-workspace";
  const endpointName = "testEndpointName";
  const deploymentName = "testDeploymentName";
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.onlineDeployments.get(
    resourceGroupName,
    workspaceName,
    endpointName,
    deploymentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getKubernetesOnlineDeployment();
  await getManagedOnlineDeployment();
}

main().catch(console.error);
