// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get available models under the endpoint resource.
 *
 * @summary get available models under the endpoint resource.
 * x-ms-original-file: 2026-03-15-preview/Endpoint/getModels.json
 */
async function getEndpointModels(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.endpoint.getModels(
    "test-rg",
    "aml-workspace-name",
    "Azure.OpenAI",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getEndpointModels();
}

main().catch(console.error);
