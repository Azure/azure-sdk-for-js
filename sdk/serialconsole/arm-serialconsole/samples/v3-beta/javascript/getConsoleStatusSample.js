// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSerialConsoleClient } = require("@azure/arm-serialconsole");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets whether or not Serial Console is disabled for a given subscription
 *
 * @summary gets whether or not Serial Console is disabled for a given subscription
 * x-ms-original-file: 2024-07-01/SerialConsoleStatus.json
 */
async function getTheSerialConsoleDisabledStatusForASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftSerialConsoleClient(credential, subscriptionId);
  const result = await client.getConsoleStatus("default");
  console.log(result);
}

async function main() {
  await getTheSerialConsoleDisabledStatusForASubscription();
}

main().catch(console.error);
