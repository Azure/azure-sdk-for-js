// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a SolutionConfiguration
 *
 * @summary delete a SolutionConfiguration
 * x-ms-original-file: 2027-01-01/SolutionConfigurations_Delete_MaximumSet_Gen.json
 */
async function solutionConfigurationsDeleteGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  await client.solutionConfigurations.delete(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "abc",
  );
}

async function main(): Promise<void> {
  await solutionConfigurationsDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
