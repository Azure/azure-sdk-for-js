// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list SolutionConfiguration resources by parent
 *
 * @summary list SolutionConfiguration resources by parent
 * x-ms-original-file: 2024-12-01/SolutionConfigurations_List.json
 */
async function solutionConfigurationsList() {
  const credential = new DefaultAzureCredential();
  const client = new HybridConnectivityManagementAPI(credential);
  const resArray = new Array();
  for await (const item of client.solutionConfigurations.list("ymuj")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await solutionConfigurationsList();
}

main().catch(console.error);
