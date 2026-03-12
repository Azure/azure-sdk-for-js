// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get all private endpoint connections in the project. Returns a json array of objects of type 'privateEndpointConnections' as specified in the Models section.
 *
 * @summary Get all private endpoint connections in the project. Returns a json array of objects of type 'privateEndpointConnections' as specified in the Models section.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/PrivateEndpointConnections_ListByProject.json
 */

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function privateEndpointConnectionsListByProject(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "6393a73f-8d55-47ef-b6dd-179b3e0c7910";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "abgoyal-westEurope";
  const projectName = "abgoyalWEselfhostb72bproject";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.privateEndpointConnectionOperations.listByProject(
    resourceGroupName,
    projectName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsListByProject();
}

main().catch(console.error);
