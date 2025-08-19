// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a self-hosted integration runtime node.
 *
 * @summary Deletes a self-hosted integration runtime node.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/IntegrationRuntimeNodes_Delete.json
 */

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function integrationRuntimesNodesDelete(): Promise<void> {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const integrationRuntimeName = "exampleIntegrationRuntime";
  const nodeName = "Node_1";
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimeNodes.delete(
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    nodeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationRuntimesNodesDelete();
}

main().catch(console.error);
