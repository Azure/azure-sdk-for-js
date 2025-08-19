// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftVoiceServices } from "@azure/arm-voiceservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a CommunicationsGateway
 *
 * @summary Get a CommunicationsGateway
 * x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_Get.json
 */
async function getCommunicationsGatewayResource(): Promise<void> {
  const subscriptionId =
    process.env["VOICESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["VOICESERVICES_RESOURCE_GROUP"] || "testrg";
  const communicationsGatewayName = "myname";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftVoiceServices(credential, subscriptionId);
  const result = await client.communicationsGateways.get(
    resourceGroupName,
    communicationsGatewayName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getCommunicationsGatewayResource();
}

main().catch(console.error);
