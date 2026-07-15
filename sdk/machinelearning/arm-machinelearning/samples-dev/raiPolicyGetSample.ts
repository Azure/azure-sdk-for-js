// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Content Filters associated with the Azure OpenAI account.
 *
 * @summary gets the specified Content Filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-03-15-preview/Endpoint/RaiPolicy/get.json
 */
async function getRaiPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.raiPolicy.get(
    "test-rg",
    "aml-workspace-name",
    "Azure.OpenAI",
    "raiPolicyName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getRaiPolicy();
}

main().catch(console.error);
