// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves the built-in policy set definition with the given name.
 *
 * @summary this operation retrieves the built-in policy set definition with the given name.
 * x-ms-original-file: 2025-03-01/getBuiltInPolicySetDefinition.json
 */
async function retrieveABuiltInPolicySetDefinition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policySetDefinitions.getBuiltIn(
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveABuiltInPolicySetDefinition();
}

main().catch(console.error);
