// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectionSetting } from "@azure/arm-botservice";
import { AzureBotService } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a Connection Setting registration for a Bot Service
 *
 * @summary Updates a Connection Setting registration for a Bot Service
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/UpdateConnection.json
 */
async function updateConnectionSetting(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "OneResourceGroupName";
  const resourceName = "samplebotname";
  const connectionName = "sampleConnection";
  const parameters: ConnectionSetting = {
    etag: "etag1",
    location: "global",
    properties: {
      clientId: "sampleclientid",
      clientSecret: "samplesecret",
      parameters: [
        { key: "key1", value: "value1" },
        { key: "key2", value: "value2" },
      ],
      scopes: "samplescope",
      serviceProviderDisplayName: "serviceProviderDisplayName",
      serviceProviderId: "serviceproviderid",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.botConnection.update(
    resourceGroupName,
    resourceName,
    connectionName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateConnectionSetting();
}

main().catch(console.error);
