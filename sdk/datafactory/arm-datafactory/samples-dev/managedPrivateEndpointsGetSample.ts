// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a managed private endpoint.
 *
 * @summary Gets a managed private endpoint.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/ManagedPrivateEndpoints_Get.json
 */

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function managedPrivateEndpointsGet(): Promise<void> {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const managedVirtualNetworkName = "exampleManagedVirtualNetworkName";
  const managedPrivateEndpointName = "exampleManagedPrivateEndpointName";
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.managedPrivateEndpoints.get(
    resourceGroupName,
    factoryName,
    managedVirtualNetworkName,
    managedPrivateEndpointName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await managedPrivateEndpointsGet();
}

main().catch(console.error);
