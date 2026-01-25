// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a SolutionConfiguration
 *
 * @summary update a SolutionConfiguration
 * x-ms-original-file: 2024-12-01/SolutionConfigurations_Update.json
 */
async function solutionConfigurationsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.solutionConfigurations.update("ymuj", "dxt", {
    solutionType: "myzljlstvmgkp",
    solutionSettings: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await solutionConfigurationsUpdate();
}

main().catch(console.error);
