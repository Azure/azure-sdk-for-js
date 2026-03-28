// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Features.
 *
 * @summary list Features.
 * x-ms-original-file: 2025-12-01/Feature/list.json
 */
async function listFeature(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.features.list("test-rg", "my-aml-workspace", "string", "string", {
    tags: "string",
    featureName: "string",
    description: "string",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listFeature();
}

main().catch(console.error);
