// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerate account keys
 *
 * @summary regenerate account keys
 * x-ms-original-file: 2026-03-15-preview/Endpoint/regenerateKey.json
 */
async function regenerateEndpointKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.endpoint.regenerateKeys(
    "test-rg",
    "aml-workspace-name",
    "Azure.OpenAI",
    { keyName: "Key1" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await regenerateEndpointKeys();
}

main().catch(console.error);
