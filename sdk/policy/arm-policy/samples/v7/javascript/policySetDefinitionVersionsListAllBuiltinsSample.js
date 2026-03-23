// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation lists all the built-in policy set definition versions for all built-in policy set definitions.
 *
 * @summary this operation lists all the built-in policy set definition versions for all built-in policy set definitions.
 * x-ms-original-file: 2025-03-01/listAllBuiltInPolicySetDefinitionVersions.json
 */
async function listAllBuiltInPolicyDefinitionVersions() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policySetDefinitionVersions.listAllBuiltins();
  console.log(result);
}

async function main() {
  await listAllBuiltInPolicyDefinitionVersions();
}

main().catch(console.error);
