// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to trigger immediate sync with source cloud
 *
 * @summary trigger immediate sync with source cloud
 * x-ms-original-file: 2024-12-01/SolutionConfigurations_SyncNow.json
 */
async function solutionConfigurationsSyncNow() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.solutionConfigurations.syncNow("ymuj", "tks");
  console.log(result);
}

async function main() {
  await solutionConfigurationsSyncNow();
}

main().catch(console.error);
