// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSerialConsoleClient } = require("@azure/arm-serialconsole");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enables the Serial Console service for all VMs and VM scale sets in the provided subscription
 *
 * @summary enables the Serial Console service for all VMs and VM scale sets in the provided subscription
 * x-ms-original-file: 2024-07-01/EnableConsoleExamples.json
 */
async function enableSerialConsoleForASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftSerialConsoleClient(credential, subscriptionId);
  const result = await client.serialConsoleOperationGroup.enableConsole("default");
  console.log(result);
}

async function main() {
  await enableSerialConsoleForASubscription();
}

main().catch(console.error);
