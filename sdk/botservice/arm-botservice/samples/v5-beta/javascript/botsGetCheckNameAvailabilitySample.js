// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check whether a bot name is available.
 *
 * @summary check whether a bot name is available.
 * x-ms-original-file: 2023-09-15-preview/CheckNameAvailability.json
 */
async function checkNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.bots.getCheckNameAvailability({
    name: "testbotname",
    type: "string",
  });
  console.log(result);
}

async function main() {
  await checkNameAvailability();
}

main().catch(console.error);
