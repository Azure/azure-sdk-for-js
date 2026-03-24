// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves the built-in policy set definition version with the given name and version.
 *
 * @summary this operation retrieves the built-in policy set definition version with the given name and version.
 * x-ms-original-file: 2025-03-01/getBuiltInPolicySetDefinitionVersion.json
 */
async function retrieveABuiltInPolicySetDefinitionVersion() {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policySetDefinitionVersions.getBuiltIn(
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
    "1.2.1",
  );
  console.log(result);
}

async function main() {
  await retrieveABuiltInPolicySetDefinitionVersion();
}

main().catch(console.error);
