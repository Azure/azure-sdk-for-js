// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specified private endpoint connection associated with the configuration store.
 *
 * @summary Gets the specified private endpoint connection associated with the configuration store.
 * x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/stable/2024-06-01/examples/ConfigurationStoresGetPrivateEndpointConnection.json
 */

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function privateEndpointConnectionGetConnection(): Promise<void> {
  const subscriptionId =
    process.env["APPCONFIGURATION_SUBSCRIPTION_ID"] ||
    "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const resourceGroupName =
    process.env["APPCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroup";
  const configStoreName = "contoso";
  const privateEndpointConnectionName = "myConnection";
  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.privateEndpointConnections.get(
    resourceGroupName,
    configStoreName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionGetConnection();
}

main().catch(console.error);
