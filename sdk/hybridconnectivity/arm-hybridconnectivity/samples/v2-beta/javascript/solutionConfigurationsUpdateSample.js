// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a SolutionConfiguration
 *
 * @summary update a SolutionConfiguration
 * x-ms-original-file: 2024-12-01/SolutionConfigurations_Update.json
 */
async function solutionConfigurationsUpdate() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.solutionConfigurations.update("ymuj", "dxt", {
    properties: { solutionType: "myzljlstvmgkp", solutionSettings: {} },
  });
  console.log(result);
}

async function main() {
  await solutionConfigurationsUpdate();
}

main().catch(console.error);
