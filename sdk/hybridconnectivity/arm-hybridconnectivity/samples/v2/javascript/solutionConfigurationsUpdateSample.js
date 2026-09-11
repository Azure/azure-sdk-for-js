// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a SolutionConfiguration
 *
 * @summary update a SolutionConfiguration
 * x-ms-original-file: 2027-01-01/SolutionConfigurations_Update_MaximumSet_Gen.json
 */
async function solutionConfigurationsUpdateGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.solutionConfigurations.update(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "abc",
    { properties: { solutionType: "myzljlstvmgkp", solutionSettings: {} } },
  );
  console.log(result);
}

async function main() {
  await solutionConfigurationsUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
