// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationsGatewayUpdate } from "@azure/arm-voiceservices";
import { MicrosoftVoiceServices } from "@azure/arm-voiceservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update a CommunicationsGateway
 *
 * @summary Update a CommunicationsGateway
 * x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_Update.json
 */
async function updateCommunicationsGatewayResource(): Promise<void> {
  const subscriptionId =
    process.env["VOICESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["VOICESERVICES_RESOURCE_GROUP"] || "testrg";
  const communicationsGatewayName = "myname";
  const properties: CommunicationsGatewayUpdate = {};
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftVoiceServices(credential, subscriptionId);
  const result = await client.communicationsGateways.update(
    resourceGroupName,
    communicationsGatewayName,
    properties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateCommunicationsGatewayResource();
}

main().catch(console.error);
