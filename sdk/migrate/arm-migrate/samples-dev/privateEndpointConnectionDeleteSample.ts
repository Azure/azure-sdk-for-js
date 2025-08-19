// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete the private endpoint connection from the project. T.

 *
 * @summary Delete the private endpoint connection from the project. T.

 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/PrivateEndpointConnections_Delete.json
 */

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function privateEndpointConnectionsDelete(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "6393a73f-8d55-47ef-b6dd-179b3e0c7910";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "abgoyal-westEurope";
  const projectName = "abgoyalWEselfhostb72bproject";
  const privateEndpointConnectionName =
    "custestpece80project3980pe.7e35576b-3df4-478e-9759-f64351cf4f43";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.privateEndpointConnectionOperations.delete(
    resourceGroupName,
    projectName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsDelete();
}

main().catch(console.error);
