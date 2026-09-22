// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Global parameter
 *
 * @summary deletes a Global parameter
 * x-ms-original-file: 2018-06-01/GlobalParameters_Delete.json
 */
async function globalParametersDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.globalParameters.delete("exampleResourceGroup", "exampleFactoryName", "default");
}

async function main() {
  await globalParametersDelete();
}

main().catch(console.error);
