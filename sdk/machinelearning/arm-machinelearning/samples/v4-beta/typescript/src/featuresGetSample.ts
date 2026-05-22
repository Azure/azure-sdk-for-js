// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get feature.
 *
 * @summary get feature.
 * x-ms-original-file: 2025-12-01/Feature/get.json
 */
async function getFeature(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.features.get(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
    "string",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getFeature();
}

main().catch(console.error);
