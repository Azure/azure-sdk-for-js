// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a SolutionConfiguration
 *
 * @summary delete a SolutionConfiguration
 * x-ms-original-file: 2024-12-01/SolutionConfigurations_Delete.json
 */
async function solutionConfigurationsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  await client.solutionConfigurations.delete("ymuj", "stu");
}

async function main(): Promise<void> {
  await solutionConfigurationsDelete();
}

main().catch(console.error);
