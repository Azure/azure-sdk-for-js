// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSerialConsoleClient } = require("@azure/arm-serialconsole");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disables the Serial Console service for all VMs and VM scale sets in the provided subscription
 *
 * @summary disables the Serial Console service for all VMs and VM scale sets in the provided subscription
 * x-ms-original-file: 2024-07-01/DisableConsoleExamples.json
 */
async function disableSerialConsoleForASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftSerialConsoleClient(credential, subscriptionId);
  const result = await client.serialConsoleOperationGroup.disableConsole("default");
  console.log(result);
}

async function main() {
  await disableSerialConsoleForASubscription();
}

main().catch(console.error);
