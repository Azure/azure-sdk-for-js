// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a private endpoint connection
 *
 * @summary deletes a private endpoint connection
 * x-ms-original-file: 2018-06-01/DeletePrivateEndpointConnection.json
 */
async function deleteAPrivateEndpointConnectionForADatafactory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.privateEndpointConnection.delete(
    "exampleResourceGroup",
    "exampleFactoryName",
    "connection",
  );
}

async function main() {
  await deleteAPrivateEndpointConnectionForADatafactory();
}

main().catch(console.error);
