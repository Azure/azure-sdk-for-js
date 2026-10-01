// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all the deployments under the endpoint resource scope
 *
 * @summary get all the deployments under the endpoint resource scope
 * x-ms-original-file: 2026-03-15-preview/Endpoint/Deployment/getDeployments.json
 */
async function getEndpointDeployments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.endpointDeployment.list(
    "resourceGroup-1",
    "testworkspace",
    "Azure.OpenAI",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getEndpointDeployments();
}

main().catch(console.error);
