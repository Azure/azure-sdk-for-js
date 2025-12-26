// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a SolutionConfiguration
 *
 * @summary get a SolutionConfiguration
 * x-ms-original-file: 2024-12-01/SolutionConfigurations_Get.json
 */
async function solutionConfigurationsGet() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.solutionConfigurations.get("ymuj", "tks");
  console.log(result);
}

async function main() {
  await solutionConfigurationsGet();
}

main().catch(console.error);
