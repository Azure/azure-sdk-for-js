// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a SolutionConfiguration
 *
 * @summary create a SolutionConfiguration
 * x-ms-original-file: 2024-12-01/SolutionConfigurations_CreateOrUpdate.json
 */
async function solutionConfigurationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const result = await client.solutionConfigurations.createOrUpdate("ymuj", "keebwujt", {
    properties: { solutionType: "nmtqllkyohwtsthxaimsye", solutionSettings: {} },
  });
  console.log(result);
}

async function main() {
  await solutionConfigurationsCreateOrUpdate();
}

main().catch(console.error);
