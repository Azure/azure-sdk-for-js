// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a Connection Setting registration for a Bot Service
 *
 * @summary updates a Connection Setting registration for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/UpdateConnection.json
 */
async function updateConnectionSetting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.botConnection.update(
    "OneResourceGroupName",
    "samplebotname",
    "sampleConnection",
    {
      etag: "etag1",
      location: "global",
      properties: {
        name: "sampleName",
        clientId: "sampleclientid",
        clientSecret: "samplesecret",
        id: "sampleId",
        parameters: [
          { key: "key1", value: "value1" },
          { key: "key2", value: "value2" },
        ],
        scopes: "samplescope",
        serviceProviderDisplayName: "serviceProviderDisplayName",
        serviceProviderId: "serviceproviderid",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateConnectionSetting();
}

main().catch(console.error);
