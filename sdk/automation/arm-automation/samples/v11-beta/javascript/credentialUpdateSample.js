// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a credential.
 *
 * @summary update a credential.
 * x-ms-original-file: 2024-10-23/updateCredential_patch.json
 */
async function updateACredential() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.credential.update("rg", "myAutomationAccount18", "myCredential", {
    name: "myCredential",
    description: "my description goes here",
    password: "<password>",
    userName: "mylingaiah",
  });
  console.log(result);
}

async function main() {
  await updateACredential();
}

main().catch(console.error);
