// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list featurestore entity containers.
 *
 * @summary list featurestore entity containers.
 * x-ms-original-file: 2025-12-01/Workspace/FeaturestoreEntityContainer/list.json
 */
async function listWorkspaceFeaturestoreEntityContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.featurestoreEntityContainers.list("test-rg", "my-aml-workspace", {
    tags: "string",
    listViewType: "All",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkspaceFeaturestoreEntityContainer();
}

main().catch(console.error);
