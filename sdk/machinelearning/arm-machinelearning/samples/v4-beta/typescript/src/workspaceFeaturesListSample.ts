// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all enabled features for a workspace
 *
 * @summary lists all enabled features for a workspace
 * x-ms-original-file: 2025-12-01/WorkspaceFeature/list.json
 */
async function listWorkspaceFeatures(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceFeatures.list("myResourceGroup", "testworkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkspaceFeatures();
}

main().catch(console.error);
