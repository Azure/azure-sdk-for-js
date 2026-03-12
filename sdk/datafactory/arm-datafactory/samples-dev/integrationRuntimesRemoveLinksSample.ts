// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Remove all linked integration runtimes under specific data factory in a self-hosted integration runtime.
 *
 * @summary Remove all linked integration runtimes under specific data factory in a self-hosted integration runtime.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/IntegrationRuntimes_RemoveLinks.json
 */

import {
  LinkedIntegrationRuntimeRequest,
  DataFactoryManagementClient,
} from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function integrationRuntimesUpgrade(): Promise<void> {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const integrationRuntimeName = "exampleIntegrationRuntime";
  const linkedIntegrationRuntimeRequest: LinkedIntegrationRuntimeRequest = {
    linkedFactoryName: "exampleFactoryName-linked",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.removeLinks(
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    linkedIntegrationRuntimeRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationRuntimesUpgrade();
}

main().catch(console.error);
