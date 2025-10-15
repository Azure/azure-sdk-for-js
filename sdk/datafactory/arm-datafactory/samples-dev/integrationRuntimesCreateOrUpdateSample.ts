// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates an integration runtime.
 *
 * @summary Creates or updates an integration runtime.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/IntegrationRuntimes_Create.json
 */

import {
  IntegrationRuntimeResource,
  DataFactoryManagementClient,
} from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function integrationRuntimesCreate(): Promise<void> {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const integrationRuntimeName = "exampleIntegrationRuntime";
  const integrationRuntime: IntegrationRuntimeResource = {
    properties: {
      type: "SelfHosted",
      description: "A selfhosted integration runtime",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.createOrUpdate(
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    integrationRuntime,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationRuntimesCreate();
}

main().catch(console.error);
