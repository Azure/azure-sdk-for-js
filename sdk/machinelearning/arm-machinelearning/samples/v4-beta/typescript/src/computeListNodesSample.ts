// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the details (e.g IP address, port etc) of all the compute nodes in the compute.
 *
 * @summary get the details (e.g IP address, port etc) of all the compute nodes in the compute.
 * x-ms-original-file: 2025-12-01/Compute/listNodes.json
 */
async function getComputeNodesInformationForACompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.compute.listNodes("testrg123", "workspaces123", "compute123")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getComputeNodesInformationForACompute();
}

main().catch(console.error);
