// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete version.
 *
 * @summary Delete version.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/Workspace/ModelVersion/delete.json
 */

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteWorkspaceModelVersion(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "test-rg";
  const workspaceName = "my-aml-workspace";
  const name = "string";
  const version = "string";
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.modelVersions.delete(resourceGroupName, workspaceName, name, version);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteWorkspaceModelVersion();
}

main().catch(console.error);
