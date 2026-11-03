// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerate a primary or secondary agent registration key
 *
 * @summary regenerate a primary or secondary agent registration key
 * x-ms-original-file: 2024-10-23/regenerateAgentRegistrationKey.json
 */
async function regenerateRegistrationKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.agentRegistrationInformation.regenerateKey(
    "rg",
    "myAutomationAccount18",
    { keyName: "primary" },
  );
  console.log(result);
}

async function main() {
  await regenerateRegistrationKey();
}

main().catch(console.error);
