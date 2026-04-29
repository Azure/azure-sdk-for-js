// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerates the authentication key for an integration runtime.
 *
 * @summary regenerates the authentication key for an integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_RegenerateAuthKey.json
 */
async function integrationRuntimesRegenerateAuthKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.regenerateAuthKey(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
    { keyName: "authKey2" },
  );
  console.log(result);
}

async function main() {
  await integrationRuntimesRegenerateAuthKey();
}

main().catch(console.error);
