// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation lists all the built-in policy set definition versions for all built-in policy set definitions.
 *
 * @summary this operation lists all the built-in policy set definition versions for all built-in policy set definitions.
 * x-ms-original-file: 2025-03-01/listAllBuiltInPolicySetDefinitionVersions.json
 */
async function listAllBuiltInPolicyDefinitionVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policySetDefinitionVersions.listAllBuiltins();
  console.log(result);
}

async function main(): Promise<void> {
  await listAllBuiltInPolicyDefinitionVersions();
}

main().catch(console.error);
