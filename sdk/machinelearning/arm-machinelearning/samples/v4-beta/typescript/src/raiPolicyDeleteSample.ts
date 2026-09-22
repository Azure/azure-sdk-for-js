// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Content Filters associated with the Azure OpenAI account.
 *
 * @summary deletes the specified Content Filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-03-15-preview/Endpoint/RaiPolicy/delete.json
 */
async function deleteRaiPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.raiPolicy.delete("test-rg", "aml-workspace-name", "Azure.OpenAI", "raiPolicyName");
}

async function main(): Promise<void> {
  await deleteRaiPolicy();
}

main().catch(console.error);
