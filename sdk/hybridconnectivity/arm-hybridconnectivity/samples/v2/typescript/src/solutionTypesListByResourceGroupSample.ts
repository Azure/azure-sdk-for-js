// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list SolutionTypeResource resources by resource group
 *
 * @summary list SolutionTypeResource resources by resource group
 * x-ms-original-file: 2027-01-01/SolutionTypes_ListByResourceGroup_MaximumSet_Gen.json
 */
async function solutionTypesListByResourceGroupGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.solutionTypes.listByResourceGroup("rghybridconnectivity")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await solutionTypesListByResourceGroupGeneratedByMaximumSetRule();
}

main().catch(console.error);
