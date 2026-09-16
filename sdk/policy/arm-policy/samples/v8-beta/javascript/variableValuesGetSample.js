// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves a single variable value; given its name, subscription it was created at and the variable it's created for.
 *
 * @summary this operation retrieves a single variable value; given its name, subscription it was created at and the variable it's created for.
 * x-ms-original-file: 2026-01-01-preview/getVariableValue.json
 */
async function retrieveAVariableValue() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.variableValues.get("DemoTestVariable", "TestValue");
  console.log(result);
}

async function main() {
  await retrieveAVariableValue();
}

main().catch(console.error);
