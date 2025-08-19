// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftVoiceServices } from "@azure/arm-voiceservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a TestLine
 *
 * @summary Get a TestLine
 * x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/TestLines_Get.json
 */
async function getTestLineResource(): Promise<void> {
  const subscriptionId =
    process.env["VOICESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["VOICESERVICES_RESOURCE_GROUP"] || "testrg";
  const communicationsGatewayName = "myname";
  const testLineName = "myline";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftVoiceServices(credential, subscriptionId);
  const result = await client.testLines.get(
    resourceGroupName,
    communicationsGatewayName,
    testLineName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTestLineResource();
}

main().catch(console.error);
