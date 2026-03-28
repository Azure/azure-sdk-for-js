// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get version.
 *
 * @summary get version.
 * x-ms-original-file: 2025-12-01/Workspace/CodeVersion/get.json
 */
async function getWorkspaceCodeVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.codeVersions.get("test-rg", "my-aml-workspace", "string", "string");
  console.log(result);
}

async function main(): Promise<void> {
  await getWorkspaceCodeVersion();
}

main().catch(console.error);
