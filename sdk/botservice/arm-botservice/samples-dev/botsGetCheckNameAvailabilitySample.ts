// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check whether a bot name is available.
 *
 * @summary Check whether a bot name is available.
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/CheckNameAvailability.json
 */

import type { CheckNameAvailabilityRequestBody } from "@azure/arm-botservice";
import { AzureBotService } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function checkNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const parameters: CheckNameAvailabilityRequestBody = {
    name: "testbotname",
    type: "string",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.bots.getCheckNameAvailability(parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailability();
}

main().catch(console.error);
