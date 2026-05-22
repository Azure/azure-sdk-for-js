// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to prepare Azure Machine Learning Workspace's notebook resource
 *
 * @summary prepare Azure Machine Learning Workspace's notebook resource
 * x-ms-original-file: 2025-12-01/Notebook/prepare.json
 */
async function prepareNotebook(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.workspaces.prepareNotebook("testrg123", "workspaces123");
  console.log(result);
}

async function main(): Promise<void> {
  await prepareNotebook();
}

main().catch(console.error);
