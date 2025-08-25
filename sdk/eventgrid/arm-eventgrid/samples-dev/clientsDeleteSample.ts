// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete an existing client.
 *
 * @summary Delete an existing client.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/Clients_Delete.json
 */

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function clientsDelete(): Promise<void> {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] ||
    "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const resourceGroupName =
    process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const namespaceName = "exampleNamespaceName1";
  const clientName = "exampleClientName1";
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.clients.beginDeleteAndWait(
    resourceGroupName,
    namespaceName,
    clientName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await clientsDelete();
}

main().catch(console.error);
