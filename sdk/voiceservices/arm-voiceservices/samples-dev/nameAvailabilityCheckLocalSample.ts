// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CheckNameAvailabilityRequest } from "@azure/arm-voiceservices";
import { MicrosoftVoiceServices } from "@azure/arm-voiceservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Check whether the resource name is available in the given region.
 *
 * @summary Check whether the resource name is available in the given region.
 * x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/NameAvailability_CheckLocal.json
 */
async function checkLocalNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["VOICESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const location = "useast";
  const body: CheckNameAvailabilityRequest = {
    name: "myname",
    type: "Microsoft.VoiceServices/CommunicationsGateways",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftVoiceServices(credential, subscriptionId);
  const result = await client.nameAvailability.checkLocal(location, body);
  console.log(result);
}

async function main(): Promise<void> {
  await checkLocalNameAvailability();
}

main().catch(console.error);
