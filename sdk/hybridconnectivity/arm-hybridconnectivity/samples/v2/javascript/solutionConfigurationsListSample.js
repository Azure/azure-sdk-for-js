// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list SolutionConfiguration resources by parent
 *
 * @summary list SolutionConfiguration resources by parent
 * x-ms-original-file: 2027-01-01/SolutionConfigurations_List_MaximumSet_Gen.json
 */
async function solutionConfigurationsListGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const resArray = new Array();
  for await (const item of client.solutionConfigurations.list(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list SolutionConfiguration resources by parent
 *
 * @summary list SolutionConfiguration resources by parent
 * x-ms-original-file: 2027-01-01/SolutionConfigurations_List_MinimumSet_Gen.json
 */
async function solutionConfigurationsListGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const resArray = new Array();
  for await (const item of client.solutionConfigurations.list(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await solutionConfigurationsListGeneratedByMaximumSetRule();
  await solutionConfigurationsListGeneratedByMinimumSetRule();
}

main().catch(console.error);
