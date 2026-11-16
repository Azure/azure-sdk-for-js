// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a SolutionConfiguration
 *
 * @summary create a SolutionConfiguration
 * x-ms-original-file: 2027-01-01/SolutionConfigurations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function solutionConfigurationsCreateOrUpdateGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.solutionConfigurations.createOrUpdate(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "abc",
    { properties: { solutionType: "nmtqllkyohwtsthxaimsye", solutionSettings: {} } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionConfigurationsCreateOrUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
