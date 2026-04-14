// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a self-hosted integration runtime node.
 *
 * @summary gets a self-hosted integration runtime node.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimeNodes_Get.json
 */
async function integrationRuntimeNodesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimeNodes.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
    "Node_1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationRuntimeNodesGet();
}

main().catch(console.error);
