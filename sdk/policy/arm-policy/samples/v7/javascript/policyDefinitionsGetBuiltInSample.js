// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves the built-in policy definition with the given name.
 *
 * @summary this operation retrieves the built-in policy definition with the given name.
 * x-ms-original-file: 2025-03-01/getBuiltinPolicyDefinition.json
 */
async function retrieveABuiltInPolicyDefinition() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policyDefinitions.getBuiltIn("7433c107-6db4-4ad1-b57a-a76dce0154a1");
  console.log(result);
}

async function main() {
  await retrieveABuiltInPolicyDefinition();
}

main().catch(console.error);
