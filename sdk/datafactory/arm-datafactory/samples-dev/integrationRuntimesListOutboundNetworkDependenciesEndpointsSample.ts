// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the list of outbound network dependencies for a given Azure-SSIS integration runtime.
 *
 * @summary Gets the list of outbound network dependencies for a given Azure-SSIS integration runtime.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/IntegrationRuntimes_ListOutboundNetworkDependenciesEndpoints.json
 */

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function integrationRuntimesOutboundNetworkDependenciesEndpoints(): Promise<void> {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "7ad7c73b-38b8-4df3-84ee-52ff91092f61";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const integrationRuntimeName = "exampleIntegrationRuntime";
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result =
    await client.integrationRuntimes.listOutboundNetworkDependenciesEndpoints(
      resourceGroupName,
      factoryName,
      integrationRuntimeName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationRuntimesOutboundNetworkDependenciesEndpoints();
}

main().catch(console.error);
