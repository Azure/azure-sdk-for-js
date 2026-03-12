// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update the state of specified private endpoint connection associated with the Bot.
 *
 * @summary Update the state of specified private endpoint connection associated with the Bot.
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/PutPrivateEndpointConnection.json
 */

import type { PrivateEndpointConnection } from "@azure/arm-botservice";
import { AzureBotService } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function putPrivateEndpointConnection(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "res7687";
  const resourceName = "sto9699";
  const privateEndpointConnectionName = "{privateEndpointConnectionName}";
  const properties: PrivateEndpointConnection = {
    privateLinkServiceConnectionState: {
      description: "Auto-Approved",
      status: "Approved",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.privateEndpointConnections.create(
    resourceGroupName,
    resourceName,
    privateEndpointConnectionName,
    properties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putPrivateEndpointConnection();
}

main().catch(console.error);
