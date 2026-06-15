// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a private endpoint connection
 *
 * @summary gets a private endpoint connection
 * x-ms-original-file: 2018-06-01/GetPrivateEndpointConnection.json
 */
async function getAPrivateEndpointConnectionForADatafactory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnection.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "connection",
  );
  console.log(result);
}

async function main() {
  await getAPrivateEndpointConnectionForADatafactory();
}

main().catch(console.error);
