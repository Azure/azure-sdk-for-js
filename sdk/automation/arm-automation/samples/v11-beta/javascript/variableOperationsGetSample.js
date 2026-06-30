// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the variable identified by variable name.
 *
 * @summary retrieve the variable identified by variable name.
 * x-ms-original-file: 2024-10-23/getVariable.json
 */
async function getAVariable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.variableOperations.get("rg", "sampleAccount9", "sampleVariable");
  console.log(result);
}

async function main() {
  await getAVariable();
}

main().catch(console.error);
