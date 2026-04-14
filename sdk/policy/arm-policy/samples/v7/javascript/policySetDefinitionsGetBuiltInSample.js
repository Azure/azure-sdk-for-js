// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves the built-in policy set definition with the given name.
 *
 * @summary this operation retrieves the built-in policy set definition with the given name.
 * x-ms-original-file: 2025-03-01/getBuiltInPolicySetDefinition.json
 */
async function retrieveABuiltInPolicySetDefinition() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policySetDefinitions.getBuiltIn(
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
  );
  console.log(result);
}

async function main() {
  await retrieveABuiltInPolicySetDefinition();
}

main().catch(console.error);
