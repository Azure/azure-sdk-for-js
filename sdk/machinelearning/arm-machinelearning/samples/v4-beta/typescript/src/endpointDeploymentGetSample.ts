// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get deployments under endpoint resource by name
 *
 * @summary get deployments under endpoint resource by name
 * x-ms-original-file: 2026-03-15-preview/Endpoint/Deployment/get.json
 */
async function getEndpointDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.endpointDeployment.get(
    "resourceGroup-1",
    "testworkspace",
    "Azure.OpenAI",
    "text-davinci-003",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getEndpointDeployment();
}

main().catch(console.error);
