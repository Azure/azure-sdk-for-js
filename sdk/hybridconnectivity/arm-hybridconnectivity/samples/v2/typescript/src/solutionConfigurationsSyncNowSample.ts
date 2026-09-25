// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to trigger immediate sync with source cloud
 *
 * @summary trigger immediate sync with source cloud
 * x-ms-original-file: 2027-01-01/SolutionConfigurations_SyncNow_MaximumSet_Gen.json
 */
async function solutionConfigurationsSyncNowGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.solutionConfigurations.syncNow(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine",
    "abc",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionConfigurationsSyncNowGeneratedByMaximumSetRule();
}

main().catch(console.error);
