// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a private endpoint connection
 *
 * @summary deletes a private endpoint connection
 * x-ms-original-file: 2018-06-01/DeletePrivateEndpointConnection.json
 */
async function deleteAPrivateEndpointConnectionForADatafactory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.privateEndpointConnection.delete(
    "exampleResourceGroup",
    "exampleFactoryName",
    "connection",
  );
}

async function main(): Promise<void> {
  await deleteAPrivateEndpointConnectionForADatafactory();
}

main().catch(console.error);
