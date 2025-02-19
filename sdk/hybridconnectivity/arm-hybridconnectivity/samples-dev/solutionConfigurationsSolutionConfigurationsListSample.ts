// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list SolutionConfiguration resources by parent
 *
 * @summary list SolutionConfiguration resources by parent
 * x-ms-original-file: 2024-12-01/SolutionConfigurations_List.json
 */
async function solutionConfigurationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.solutionConfigurations.SolutionConfigurations_list("ymuj")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await solutionConfigurationsList();
}

main().catch(console.error);
