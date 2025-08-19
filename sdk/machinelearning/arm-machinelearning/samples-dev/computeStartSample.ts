// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Posts a start action to a compute instance
 *
 * @summary Posts a start action to a compute instance
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/Compute/start.json
 */

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function startComputeInstanceCompute(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "testrg123";
  const workspaceName = "workspaces123";
  const computeName = "compute123";
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.computeOperations.beginStartAndWait(
    resourceGroupName,
    workspaceName,
    computeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await startComputeInstanceCompute();
}

main().catch(console.error);
