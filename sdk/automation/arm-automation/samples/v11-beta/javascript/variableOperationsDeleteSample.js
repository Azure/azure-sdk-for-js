// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the variable.
 *
 * @summary delete the variable.
 * x-ms-original-file: 2024-10-23/deleteVariable.json
 */
async function deleteAVariable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.variableOperations.delete("rg", "sampleAccount9", "sampleVariable");
}

async function main() {
  await deleteAVariable();
}

main().catch(console.error);
