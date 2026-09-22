// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of outbound network dependencies for a given Azure-SSIS integration runtime.
 *
 * @summary gets the list of outbound network dependencies for a given Azure-SSIS integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_ListOutboundNetworkDependenciesEndpoints.json
 */
async function integrationRuntimesOutboundNetworkDependenciesEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7ad7c73b-38b8-4df3-84ee-52ff91092f61";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.listOutboundNetworkDependenciesEndpoints(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
  );
  console.log(result);
}

async function main() {
  await integrationRuntimesOutboundNetworkDependenciesEndpoints();
}

main().catch(console.error);
