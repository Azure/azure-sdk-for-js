// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a private endpoint connection
 *
 * @summary gets a private endpoint connection
 * x-ms-original-file: 2018-06-01/GetPrivateEndpointConnection.json
 */
async function getAPrivateEndpointConnectionForADatafactory(): Promise<void> {
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

async function main(): Promise<void> {
  await getAPrivateEndpointConnectionForADatafactory();
}

main().catch(console.error);
