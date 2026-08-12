// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists keys of Azure Machine Learning Workspaces notebook.
 *
 * @summary lists keys of Azure Machine Learning Workspaces notebook.
 * x-ms-original-file: 2026-03-15-preview/Notebook/listKeys.json
 */
async function listWorkspaceKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.workspaces.listNotebookKeys("testrg123", "workspaces123");
  console.log(result);
}

async function main(): Promise<void> {
  await listWorkspaceKeys();
}

main().catch(console.error);
