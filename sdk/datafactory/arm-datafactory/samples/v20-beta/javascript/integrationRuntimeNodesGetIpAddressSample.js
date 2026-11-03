// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the IP address of self-hosted integration runtime node.
 *
 * @summary get the IP address of self-hosted integration runtime node.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimeNodes_GetIpAddress.json
 */
async function integrationRuntimeNodesGetIpAddress() {
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

async function main() {
  await integrationRuntimeNodesGetIpAddress();
}

main().catch(console.error);
