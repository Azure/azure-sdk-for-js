// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation deletes a variable, given its name and the subscription it was created in. The scope of a variable is the part of its ID preceding '/providers/Microsoft.Authorization/variables/{variableName}'.
 *
 * @summary this operation deletes a variable, given its name and the subscription it was created in. The scope of a variable is the part of its ID preceding '/providers/Microsoft.Authorization/variables/{variableName}'.
 * x-ms-original-file: 2026-01-01-preview/deleteVariable.json
 */
async function deleteAVariable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  await client.variables.delete("DemoTestVariable");
}

async function main() {
  await deleteAVariable();
}

main().catch(console.error);
