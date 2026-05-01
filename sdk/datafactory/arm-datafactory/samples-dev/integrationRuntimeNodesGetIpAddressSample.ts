// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the IP address of self-hosted integration runtime node.
 *
 * @summary get the IP address of self-hosted integration runtime node.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimeNodes_GetIpAddress.json
 */
async function integrationRuntimeNodesGetIpAddress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimeNodes.getIpAddress(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
    "Node_1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationRuntimeNodesGetIpAddress();
}

main().catch(console.error);
