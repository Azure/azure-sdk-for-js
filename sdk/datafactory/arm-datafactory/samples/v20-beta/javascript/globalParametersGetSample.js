// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Global parameter
 *
 * @summary gets a Global parameter
 * x-ms-original-file: 2018-06-01/GlobalParameters_Get.json
 */
async function globalParametersGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.globalParameters.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "default",
  );
  console.log(result);
}

async function main() {
  await globalParametersGet();
}

main().catch(console.error);
