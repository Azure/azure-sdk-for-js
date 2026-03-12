// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified private endpoint connection associated with the Bot.
 *
 * @summary Deletes the specified private endpoint connection associated with the Bot.
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/DeletePrivateEndpointConnection.json
 */

import { AzureBotService } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deletePrivateEndpointConnection(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "res6977";
  const resourceName = "sto2527";
  const privateEndpointConnectionName = "{privateEndpointConnectionName}";
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.privateEndpointConnections.delete(
    resourceGroupName,
    resourceName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deletePrivateEndpointConnection();
}

main().catch(console.error);
