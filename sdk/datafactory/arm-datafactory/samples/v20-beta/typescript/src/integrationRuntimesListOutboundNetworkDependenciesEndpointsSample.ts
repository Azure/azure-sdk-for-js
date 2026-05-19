// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of outbound network dependencies for a given Azure-SSIS integration runtime.
 *
 * @summary gets the list of outbound network dependencies for a given Azure-SSIS integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_ListOutboundNetworkDependenciesEndpoints.json
 */
async function integrationRuntimesOutboundNetworkDependenciesEndpoints(): Promise<void> {
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

async function main(): Promise<void> {
  await integrationRuntimesOutboundNetworkDependenciesEndpoints();
}

main().catch(console.error);
